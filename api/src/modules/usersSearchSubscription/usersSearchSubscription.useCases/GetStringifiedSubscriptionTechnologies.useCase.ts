import { ValidationRules } from '@mate-academy/core';
import { Technology } from '@/models/Technology';
import { UseCase } from '@/core';

export interface GetStringifiedSubscriptionTechnologiesUseCaseOptions {
  subscriptionId: number;
}
export type GetStringifiedSubscriptionTechnologiesUseCaseResult =
Technology[] | null;

type Options = GetStringifiedSubscriptionTechnologiesUseCaseOptions;
type Result = GetStringifiedSubscriptionTechnologiesUseCaseResult;

export class GetStringifiedSubscriptionTechnologiesUseCase
  extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      subscriptionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const subscription = await this.dataLoaders.subscriptionsById.load({
      id: options.subscriptionId,
    });

    const technologiesIds = subscription?.searchParams.technologiesIds;

    if (technologiesIds) {
      const technologies = await this.dataLoaders
        .technologiesById.loadMany(technologiesIds.map(
          (id) => ({ id }),
        ));

      const technologiesWithoutErrors = technologies
        .filter((result) => !(result instanceof Error)) as Technology[][];

      return technologiesWithoutErrors.flat();
    }

    return null;
  }
}
