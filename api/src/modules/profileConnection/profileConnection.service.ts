import { ClientError, ClientErrorTypes } from '@mate-academy/core';
import { AuthService } from '@/core/Service';
import { CandidateProfile } from '@/models/CandidateProfile';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';
import { ChatMessageEvents } from '@/modules/chatMessage/chatMessage.constants';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { NewMessageSubscriptionPayload } from '@/modules/chatMessage/chatMessage.resolvers/newMessage.resolver';
import { UserRepository } from '@/modules/user/user.repository';
import { ChatMessageRepository } from '@/modules/chatMessage/chatMessage.repository';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { ProfileConnectionErrors, ProfileConnectionEvents } from './profileConnection.constants';
import { SendProfileConnectionRequestUseCaseOptions } from './profileConnection.useCases/SendProfileConnectionRequest.useCase';
import { ProfileConnectionInitiatorEnum, ProfileConnectionStatusEnum } from './profileConnection.typedefs';
import { ProfileConnectionEntity } from './ProfileConnection.entity';
import { NewProfileConnection, OfferStatusChanged } from './profileConnection.notificationTypes';
import { ReportOfferStatusUseCaseOptions } from './profileConnection.useCases/ReportOfferStatus.useCase';
import { ProfileConnectionUpdatedSubscriptionPayload } from './profileConnection.resolvers/profileConnectionUpdated.resolver';
import { ProfileConnectionRepository } from './profileConnection.repository';

export class ProfileConnectionService extends AuthService {
  private readonly profileConnectionRepository = this.makeRepository(
    ProfileConnectionRepository,
  )

  private readonly candidateProfileService = this.makeService(
    CandidateProfileService,
  )

  private readonly userRepository = this.makeRepository(
    UserRepository,
  )

  private readonly chatMessageRepository = this.makeRepository(
    ChatMessageRepository,
  )

  async sendConnectionRequest(
    options: SendProfileConnectionRequestUseCaseOptions,
  ) {
    const { candidateProfileId, recruiterProfileId } = options;

    const { candidateProfile, recruiterProfile } = await this.loadData({
      candidateProfileId,
      recruiterProfileId,
    });

    const initiator = await this.verifyProfiles(
      candidateProfile,
      recruiterProfile,
      options,
    );

    return this.createProfileConnection({
      candidateProfile,
      recruiterProfile,
      candidateProfileId,
      recruiterProfileId,
      initiator,
    });
  }

  async reportOfferStatus(
    options: ReportOfferStatusUseCaseOptions,
  ) {
    try {
      const profileConnection = await this.profileConnectionRepository
        .findProfileConnectionByConnectionId({
          profileConnectionId: options.profileConnectionId,
          userId: this.authUser.id,
        });

      if (!profileConnection) {
        throw new ClientError({
          message: ProfileConnectionErrors.ProfileConnectionNotFound,
          type: ClientErrorTypes.NotFound,
          fields: options,
        });
      }

      const profileConnectionEntity = new ProfileConnectionEntity(
        profileConnection,
        this.authUser,
      );

      const updateInitiator = profileConnectionEntity.isUserCandidate
        ? ProfileConnectionInitiatorEnum.Candidate
        : ProfileConnectionInitiatorEnum.Recruiter;

      const updateOptions = profileConnectionEntity.isUserCandidate
        ? {
          candidateReportedStatus: options.status,
          candidateReportedAt: Date.now(),
        }
        : {
          recruiterReportedStatus: options.status,
          recruiterReportedAt: Date.now(),
        };

      await profileConnection.update(updateOptions);

      const chatMessage = await this.chatMessageRepository.createSystemMessage({
        profileConnectionId: profileConnection.id,
        message: `${updateInitiator}_reported_status_${options.status}`,
      });

      this.pubSub.publish<NewMessageSubscriptionPayload>(
        ChatMessageEvents.NewChatMessageSent,
        {
          newMessage: chatMessage,
        },
      );

      this.pubSub.publish<ProfileConnectionUpdatedSubscriptionPayload>(
        ProfileConnectionEvents.ProfileConnectionUpdated,
        {
          profileConnectionUpdated: profileConnection,
        },
      );

      this.candidateProfileService.reportOfferStatus({
        updateInitiator,
        initiatorEmail: this.authUser.email,
        status: options.status,
        candidateProfileId: profileConnection.candidateProfile.id,
        profileConnectionId: options.profileConnectionId,
      });

      const buddyProfile = profileConnectionEntity.isUserCandidate
        ? profileConnection.recruiterProfile
        : profileConnection.candidateProfile;

      const initiatorProfile = profileConnectionEntity.isUserCandidate
        ? profileConnection.candidateProfile
        : profileConnection.recruiterProfile;

      const buddyUser = await this.userRepository.findById(buddyProfile.userId);

      if (!buddyUser) {
        this.logger.error(`Couldn't resolve buddy user with id = "${buddyProfile.userId}"`);
      } else {
        this.gateways.notifications.notify<OfferStatusChanged>({
          user_id: buddyUser.id,
          notification_uid: `offer_status_changed|${Date.now()}`,
          channel: this.gateways.notifications.channels.Email,
          notification_type: 'OFFER_STATUS_CHANGED',
          message_data: {
            subject: `Offer status changed by ${initiatorProfile.position}`,
            destination: buddyUser.email,
            user_name: buddyUser.computedName,
            chat_link: profileConnectionEntity.resolveChatLink(
              initiatorProfile.slug,
            ),
            buddy_name: initiatorProfile.position,
          },
        });
      }

      return profileConnection;
    } catch (e) {
      throw new ClientError({
        error: e,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }

  private async createProfileConnection(options: {
    candidateProfileId: number,
    recruiterProfileId: number,
    candidateProfile: CandidateProfile,
    recruiterProfile: RecruiterProfile,
    initiator: ProfileConnectionInitiatorEnum,
  }) {
    const {
      candidateProfile,
      recruiterProfile,
      candidateProfileId,
      recruiterProfileId,
      initiator,
    } = options;

    const transaction = await this.db.transaction();

    try {
      const [profileConnection, created] = await this.models.ProfileConnection
        .findOrCreate({
          where: {
            candidateProfileId,
            recruiterProfileId,
          },
          defaults: {
            candidateProfileId,
            candidateUserId: candidateProfile.userId,
            recruiterProfileId,
            recruiterUserId: recruiterProfile.userId,
            initiator,
            status: ProfileConnectionStatusEnum.Pending,
          },
          transaction,
        });

      if (created) {
        const buddyProfile = candidateProfile;

        const initiatorProfile = recruiterProfile;

        const buddyType = ProfileConnectionInitiatorEnum.Candidate;

        const buddyUser = await this.models.User.findByPk(buddyProfile.userId, {
          transaction,
        });
        const initiatorUser = await this.models.User
          .findByPk(initiatorProfile.userId, {
            transaction,
          });

        if (!buddyUser || !initiatorUser) {
          this.logger.error(`Couldn't resolve users with id = "${buddyProfile.userId}" and "${initiatorProfile.userId}"`);
        } else {
          const profileConnectionEntity = new ProfileConnectionEntity(
            profileConnection,
            buddyUser,
          );

          const { companyName } = initiatorProfile;
          const preparedCompanyName = companyName[0].toUpperCase()
            + companyName.slice(1).toLowerCase();

          // email to buddyUser about new connection
          this.gateways.notifications.notify<NewProfileConnection>({
            user_id: buddyUser.id,
            notification_uid: `new_profile_connection|${Date.now()}`,
            channel: this.gateways.notifications.channels.Email,
            notification_type: 'NEW_PROFILE_CONNECTION',
            message_data: {
              subject: `${buddyUser.firstName}, ${initiatorUser.computedName} from ${preparedCompanyName} reached out to you`,
              destination: buddyUser.email,
              user_name: buddyUser.firstName,
              chat_link: profileConnectionEntity.resolveChatLink(
                initiatorProfile.slug,
              ),
              buddy_name: initiatorProfile.position,
            },
          });

          // connection received by buddyUser
          this.gateways.analytics.sendEvent({
            event: this.gateways.analytics.events.profileConnection
              .NewProfileConnection,
            userEmail: buddyUser.email,
            data: {
              profileType: buddyType,
              initiator,
            },
          });

          // connection sent by authUser
          this.gateways.analytics.sendEvent({
            event: this.gateways.analytics.events.profileConnection
              .NewProfileConnection,
            userEmail: this.authUser.email,
            data: {
              profileType: initiator,
              initiator,
            },
          });
        }
      }

      const profileConnectionEntity = new ProfileConnectionEntity(
        profileConnection,
        this.authUser,
      );

      await profileConnectionEntity.initMeta(transaction);

      await transaction.commit();

      return profileConnection;
    } catch {
      transaction.rollback();

      return null;
    }
  }

  private async verifyProfiles(
    candidateProfile: CandidateProfile,
    recruiterProfile: RecruiterProfile,
    options: SendProfileConnectionRequestUseCaseOptions,
  ) {
    if (candidateProfile.status !== CandidateProfileStatusEnum.Active) {
      throw new ClientError({
        message: ProfileConnectionErrors.CandidateProfileNotActive,
      });
    }

    if (recruiterProfile.status !== RecruiterProfileStatusEnum.Active) {
      throw new ClientError({
        message: ProfileConnectionErrors.RecruiterProfileNotActive,
      });
    }

    if (candidateProfile.userId === recruiterProfile.userId) {
      throw new ClientError({
        message: ProfileConnectionErrors.ProfilesOfTheSameUser,
        fields: options,
      });
    }

    if (candidateProfile.userId === this?.authUser?.id) {
      return ProfileConnectionInitiatorEnum.Candidate;
    }

    if (recruiterProfile.userId === this?.authUser?.id) {
      return ProfileConnectionInitiatorEnum.Recruiter;
    }

    throw new ClientError({
      message: ProfileConnectionErrors.NotAuthUserProfiles,
      fields: options,
    });
  }

  private async loadData(
    options: SendProfileConnectionRequestUseCaseOptions,
  ) {
    const { candidateProfileId, recruiterProfileId } = options;

    const [
      candidateProfile,
      recruiterProfile,
    ] = await Promise.all([
      this.dataLoaders.candidateProfileById.load({ id: candidateProfileId }),
      this.dataLoaders.recruiterProfileById.load({ id: recruiterProfileId }),
    ]);

    if (recruiterProfile === null) {
      throw new ClientError({
        message: ProfileConnectionErrors.RecruiterProfileNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    if (candidateProfile === null) {
      throw new ClientError({
        message: ProfileConnectionErrors.CandidateProfileNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    return {
      candidateProfile,
      recruiterProfile,
    };
  }
}
