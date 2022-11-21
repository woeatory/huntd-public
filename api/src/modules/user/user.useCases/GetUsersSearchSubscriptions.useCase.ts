import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export type GetUsersSearchSubscriptionsUseCaseOptions = {
  userId: number;
};
export type GetUsersSearchSubscriptionsUseCaseResult =
  UsersSearchSubscription[];

type Options = GetUsersSearchSubscriptionsUseCaseOptions;
type Result = GetUsersSearchSubscriptionsUseCaseResult;

export class GetUsersSearchSubscriptionsUseCase extends AuthUseCase<
  Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.subscriptionsByUserId.load({
      userId: options.userId,
    });
  }
}
