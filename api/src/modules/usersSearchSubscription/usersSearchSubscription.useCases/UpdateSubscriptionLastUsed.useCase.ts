import { ValidationRules } from '@mate-academy/core';
import { UsersSearchSubscriptionRepository } from '@/modules/usersSearchSubscription/usersSearchSubscription.repository';
import { AuthUseCase } from '@/core';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export interface UpdateSubscriptionLastUsedUseCaseOptions {
  id: number;
}
export type UpdateSubscriptionLastUsedUseCaseResult = UsersSearchSubscription;

type Options = UpdateSubscriptionLastUsedUseCaseOptions;
type Result = UpdateSubscriptionLastUsedUseCaseResult;

export class UpdateSubscriptionLastUsedUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly usersSearchSubscriptionRepository = this.makeRepository(
    UsersSearchSubscriptionRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run({ id }: Options): Promise<Result> {
    return this.usersSearchSubscriptionRepository.updateSubscription(
      id,
      { lastUsed: new Date() },
    );
  }
}
