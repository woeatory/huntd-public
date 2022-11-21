import { ClientError, ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';
import {
  ProfileConnectionErrors,
  ProfileConnectionEvents,
} from '@/modules/profileConnection/profileConnection.constants';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';
import { UserUnreadMessagesCountUpdatedPayload } from '@/modules/user/user.resolvers/userUnreadMessagesCountUpdated.resolver';
import { UserEvents } from '@/modules/user/user.events';
import { ProfileConnectionUpdatedSubscriptionPayload } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionUpdated.resolver';

export interface UpdateConnectionLastActionTimeUseCaseOptions {
  id: number;
  time: Date;
}
export type UpdateConnectionLastActionTimeUseCaseResult = ProfileConnection;

type Options = UpdateConnectionLastActionTimeUseCaseOptions;
type Result = UpdateConnectionLastActionTimeUseCaseResult;

export class UpdateConnectionLastActionTimeUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      time: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profileConnection = await this.models.ProfileConnection.findOne({
      where: {
        id: options.id,
        [Op.or]: [
          {
            candidateUserId: this.authUser.id,
          },
          {
            recruiterUserId: this.authUser.id,
          },
        ],
      },
    });

    if (!profileConnection) {
      throw new ClientError({
        message: ProfileConnectionErrors.ConnectionNotFound,
        fields: {
          id: options.id,
          userId: this.authUser.id,
        },
      });
    }

    const profileConnectionMeta = new ProfileConnectionEntity(
      profileConnection,
      this.authUser,
    );

    await profileConnectionMeta.updateLastActionTime(
      options.time,
    );

    this.pubSub.publish<UserUnreadMessagesCountUpdatedPayload>(
      UserEvents.UserUnreadMessagesCountUpdated,
      {
        userUnreadMessagesCountUpdated: this.authUser,
      },
    );

    this.pubSub.publish<ProfileConnectionUpdatedSubscriptionPayload>(
      ProfileConnectionEvents.ProfileConnectionUpdated,
      {
        profileConnectionUpdated: profileConnection,
      },
    );

    return profileConnection;
  }
}
