import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface GetStringifiedSubscriptionSearchParamsUseCaseOptions {
  subscriptionId: number;
}
export type GetStringifiedSubscriptionSearchParamsUseCaseResult = {
  id: number;
};

type Options = GetStringifiedSubscriptionSearchParamsUseCaseOptions;
type Result = GetStringifiedSubscriptionSearchParamsUseCaseResult;

export class GetStringifiedSubscriptionSearchParamsUseCase
  extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      subscriptionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return {
      id: options.subscriptionId,
    };
  }
}
