import {
  ClientError,
  ClientErrorTypes,
  ValidationRules,
} from '@mate-academy/core';
import { ProfileConnectionInitiatorEnum, ProfileConnectionStatusEnum } from '@/modules/profileConnection/profileConnection.typedefs';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';
import {
  ProfileConnectionErrors,
  ProfileConnectionEvents,
} from '@/modules/profileConnection/profileConnection.constants';
import { NewMessageSubscriptionPayload } from '@/modules/chatMessage/chatMessage.resolvers/newMessage.resolver';
import { ChatMessageEvents } from '@/modules/chatMessage/chatMessage.constants';
import { ProfileConnectionUpdatedSubscriptionPayload } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionUpdated.resolver';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';

export interface ReviewProfileConnectionRequestUseCaseOptions {
  id: number,
  status: ProfileConnectionStatusEnum
}
export type ReviewProfileConnectionRequestUseCaseResult = ProfileConnection;

type Options = ReviewProfileConnectionRequestUseCaseOptions;
type Result= ReviewProfileConnectionRequestUseCaseResult;

export class ReviewProfileConnectionRequestUseCase extends AuthUseCase<
  Options, Result
> {
  profileConnection: ProfileConnection;

  profileConnectionEntity: ProfileConnectionEntity;

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      status: ['required', { one_of: Object.values(ProfileConnectionStatusEnum) }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    await this.loadData(options);

    if (this.profileConnection.status !== ProfileConnectionStatusEnum.Pending) {
      throw new ClientError({
        message: ProfileConnectionErrors.ProfileConnectionAlreadyReviewed,
        type: ClientErrorTypes.Forbidden,
        fields: options,
      });
    }

    if (this.isUserReviewer) {
      await this.profileConnection.update({
        status: options.status,
      });
      const chatMessage = await this.models.ChatMessage.create({
        profileConnectionId: this.profileConnection.id,
        message: `profile_connection_${options.status}`,
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
          profileConnectionUpdated: this.profileConnection,
        },
      );

      return this.profileConnection;
    }

    throw new ClientError({
      message: ProfileConnectionErrors.UserNotAllowedToReviewConnection,
      type: ClientErrorTypes.Forbidden,
      fields: options,
    });
  }

  get isUserReviewer() {
    switch (this.profileConnection.initiator) {
      case ProfileConnectionInitiatorEnum.Candidate: {
        return this.profileConnectionEntity.isUserRecruiter;
      }

      case ProfileConnectionInitiatorEnum.Recruiter:
      default: {
        return this.profileConnectionEntity.isUserCandidate;
      }
    }
  }

  private async loadData(options: Options) {
    const connection = await this.models.ProfileConnection.findByPk(options.id);

    if (connection === null) {
      throw new ClientError({
        message: ProfileConnectionErrors.ProfileConnectionNotFound,
        type: ClientErrorTypes.NotFound,
        fields: options,
      });
    }

    this.profileConnection = connection;
    this.profileConnectionEntity = new ProfileConnectionEntity(
      this.profileConnection,
      this.authUser,
    );
  }
}
