import { ValidationRules } from '@mate-academy/core';
import { UsersSearchSubscriptionRepository } from '@/modules/usersSearchSubscription/usersSearchSubscription.repository';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { AuthUseCase } from '@/core';

export interface UpdateSubscriptionTitleUseCaseOptions {
  id: number;
  values: Values;
}

export interface Values {
  title: string;
}
export type UpdateSubscriptionTitleUseCaseResult = UsersSearchSubscription;

type Options = UpdateSubscriptionTitleUseCaseOptions;
type Result = UpdateSubscriptionTitleUseCaseResult;

export class UpdateSubscriptionTitleUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly usersSearchSubscriptionRepository = this.makeRepository(
    UsersSearchSubscriptionRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      values: [{
        nested_object: {
          title: ['required', 'string'],
        },
      }],
    };
  }

  protected async run({ id, values }: Options): Promise<Result> {
    return this.usersSearchSubscriptionRepository.updateSubscription(
      id,
      values,
    );
  }
}
