import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UsersSearchSubscriptionRepository } from '@/modules/usersSearchSubscription/usersSearchSubscription.repository';

export interface UnsubscribeFromCandidatesSearchUseCaseOptions {
  id: number;
}
export type UnsubscribeFromCandidatesSearchUseCaseResult = boolean;

type Options = UnsubscribeFromCandidatesSearchUseCaseOptions;
type Result = UnsubscribeFromCandidatesSearchUseCaseResult;

export class UnsubscribeFromCandidatesSearchUseCase extends AuthUseCase<
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
    return this.usersSearchSubscriptionRepository
      .deleteSubscription(
        id,
      );
  }
}
