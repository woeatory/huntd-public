import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { UsersSearchSubscriptionRepository } from '@/modules/usersSearchSubscription/usersSearchSubscription.repository';

export type GetUserSearchSubscriptionByUserIdUseCaseOptions = {
  userId?: number;
};
export type GetUserSearchSubscriptionByUserIdUseCaseResult
  = UsersSearchSubscription[] | null;

type Options = GetUserSearchSubscriptionByUserIdUseCaseOptions;
type Result = GetUserSearchSubscriptionByUserIdUseCaseResult;

export class GetUserSearchSubscriptionByUserIdUseCase extends ServiceUseCase<
  Options, Result
> {
  private readonly usersSearchSubscriptionRepository = this.makeRepository(
    UsersSearchSubscriptionRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['positive_integer'],
    };
  }

  protected async run({ userId }: Options): Promise<Result> {
    if (userId) {
      return this.usersSearchSubscriptionRepository
        .findSubscriptionById(userId);
    }

    return null;
  }
}
