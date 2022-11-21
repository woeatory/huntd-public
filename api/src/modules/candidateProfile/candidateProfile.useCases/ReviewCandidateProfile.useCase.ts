import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { Op } from 'sequelize';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { CandidateProfile } from '@/models/CandidateProfile';
import { ServiceUseCase } from '@/core';
import {
  CandidateProfileApproved,
  CandidateProfileRejected,
} from '@/modules/candidateProfile/candidateProfile.notificationTypes';
import { FEATURES } from '@/modules/feature/initFeatures';
import { telegramCommunityLink } from '@/constants/links';
import { getHostUrl } from '@/helpers/getHostUrl';
import { CandidateProfileEvents } from '@/modules/candidateProfile/candidateProfile.constants';
import { ProfileStatusUpdatedSubscriptionPayload } from '../candidateProfile.resolvers/profileStatusUpdated.resolver';

export interface ReviewCandidateProfileUseCaseOptions {
  id: number;
  status: CandidateProfileStatusEnum;
  rejectReason?: string;
}
export type ReviewCandidateProfileUseCaseResult = CandidateProfile;

type Options = ReviewCandidateProfileUseCaseOptions;
type Result = ReviewCandidateProfileUseCaseResult;

export class ReviewCandidateProfileUseCase extends ServiceUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      status: ['required', { one_of: Object.values(CandidateProfileStatusEnum) }],
      rejectReason: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profile = await this.models.CandidateProfile.findByPk(options.id, {
      include: [
        {
          model: this.models.CandidateProfileSpecialization,
          include: [
            {
              model: this.models.Specialization,
              attributes: ['name'],
            },
          ],
        },
        { model: this.models.User },
        { model: this.models.Specialization },
        { model: this.models.EnglishLevel },
      ],
    });

    if (!profile) {
      throw new ClientError({
        message: 'Candidate Profile not found',
        type: ClientErrorTypes.NotFound,
        fields: {
          id: options.id,
        },
      });
    }

    let candidateSpecialization: (
      string | string[] | undefined
    ) = profile?.specialization?.name;

    if (this.features.isEnabled(FEATURES.preferableRoles)) {
      candidateSpecialization = (
        profile?.candidateProfileSpecializations?.map(
          (el) => el?.specialization?.name
        )
      );
    }

    const activeProfiles = await this.models.CandidateProfile.findAll({
      where: {
        status: CandidateProfileStatusEnum.Active,
        userId: profile.userId,
      },
      attributes: ['id'],
    });

    await profile.update({
      status: options.status,
      rejectReason: options.status === CandidateProfileStatusEnum.Active
        ? null
        : options.rejectReason,
    });

    if (profile.status === CandidateProfileStatusEnum.Active) {
      if (activeProfiles.length > 0) {
        await this.models.CandidateProfile.update(
          { status: CandidateProfileStatusEnum.Inactive }, {
            where: {
              id: {
                [Op.in]: [...activeProfiles.map((el) => el.id)],
              },
            },
          },
        );
      }

      this.gateways.notifications.notify<CandidateProfileApproved>({
        user_id: profile.userId,
        notification_uid: `candidate_profile_approved|${Date.now()}`,
        channel: this.gateways.notifications.channels.Email,
        notification_type: 'CANDIDATE_PROFILE_APPROVED',
        message_data: {
          subject: `${profile.user.firstName}, your profile is approved!`,
          destination: profile.user.email,
          profile_link: `${getHostUrl()}/profile-preview/candidate`,
          first_name: `${profile.user.firstName}`,
          community_link: telegramCommunityLink,
        },
      });
    }

    if (profile.status === CandidateProfileStatusEnum.Rejected) {
      this.gateways.notifications.notify<CandidateProfileRejected>({
        user_id: profile.userId,
        notification_uid: `candidate_profile_rejected|${Date.now()}`,
        channel: this.gateways.notifications.channels.Email,
        notification_type: 'PROFILE_REJECTED',
        message_data: {
          subject: `${profile.user.firstName}, your candidate's profile needs some changes!`,
          destination: profile.user.email,
          type: 'candidate',
          reject_reason: profile.rejectReason || '',
          first_name: profile.user.firstName,
          profile_link: `${getHostUrl()}/profile-preview/candidate`,
        },
      });
    }

    this.pubSub.publish<ProfileStatusUpdatedSubscriptionPayload>(
      CandidateProfileEvents.StatusUpdated,
      {
        candidateProfileStatusUpdated: profile,
      },
    );

    this.gateways.analytics.sendEvent({
      event: this.gateways.analytics.events.candidateProfile
        .CandidateProfileReviewed,
      userEmail: profile.user.email,
      data: {
        slug: profile.slug,
        salary: profile.salary,
        specialization: candidateSpecialization,
        englishLevel: profile.englishLevel?.slug,
        status: profile.status,
      },
    });

    return profile;
  }
}
