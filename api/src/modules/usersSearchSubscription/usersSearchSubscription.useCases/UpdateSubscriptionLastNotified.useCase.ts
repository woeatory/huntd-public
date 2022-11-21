import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { UsersSearchSubscriptionRepository } from '@/modules/usersSearchSubscription/usersSearchSubscription.repository';

export interface UpdateSubscriptionLastNotifiedUseCaseOptions {
  subscriptionsIds: number[];
}
export type UpdateSubscriptionLastNotifiedUseCaseResult = boolean;

type Options = UpdateSubscriptionLastNotifiedUseCaseOptions;
type Result = UpdateSubscriptionLastNotifiedUseCaseResult;

export class UpdateSubscriptionLastNotifiedUseCase extends ServiceUseCase<
  Options, Result
> {
  private readonly usersSearchSubscriptionRepository = this.makeRepository(
    UsersSearchSubscriptionRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      subscriptionsIds: [{ list_of: 'positive_integer' }],
    };
  }

  protected async run({ subscriptionsIds }: Options): Promise<Result> {
    return this.usersSearchSubscriptionRepository
      .updateSubscriptionsLastNotified(
        subscriptionsIds,
        { lastNotified: new Date() },
      );
  }
}
