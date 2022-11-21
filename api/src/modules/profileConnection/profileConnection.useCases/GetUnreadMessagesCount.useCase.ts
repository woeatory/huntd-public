import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { UseCase } from '@/core';

export interface GetUnreadMessagesCountUseCaseOptions {
  profileConnectionId: number
}
export type GetUnreadMessagesCountUseCaseResult = number;

type Options = GetUnreadMessagesCountUseCaseOptions;
type Result = GetUnreadMessagesCountUseCaseResult;

export class GetUnreadMessagesCountUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      profileConnectionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!this.authUser) {
      return 0;
    }

    const profileConnectionMeta = await this.dataLoaders
      .profileConnectionUserMetaByConnectionAndUserId.load({
        userId: this.authUser.id,
        profileConnectionId: options.profileConnectionId,
      });

    // TODO: check how to fix n+1 issue here
    return this.models.ChatMessage.count({
      where: {
        profileConnectionId: options.profileConnectionId,
        createdAt: {
          [Op.gt]: profileConnectionMeta?.lastActionTime || 0,
        },
      },
    });
  }
}
