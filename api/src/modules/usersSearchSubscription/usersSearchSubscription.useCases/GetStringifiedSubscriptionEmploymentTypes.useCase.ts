import { ValidationRules } from '@mate-academy/core';
import { EmploymentType } from '@/models/EmploymentType';
import { UseCase } from '@/core';

export interface GetStringifiedSubscriptionEmploymentTypesUseCaseOptions {
  subscriptionId: number;
}
export type GetStringifiedSubscriptionEmploymentTypesUseCaseResult =
EmploymentType[] | null;

type Options = GetStringifiedSubscriptionEmploymentTypesUseCaseOptions;
type Result = GetStringifiedSubscriptionEmploymentTypesUseCaseResult;

export class GetStringifiedSubscriptionEmploymentTypesUseCase
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

    const typesIds = subscription?.searchParams.employmentTypesIds;

    if (typesIds) {
      const employmentTypes = await this.dataLoaders
        .employmentTypesById.loadMany(typesIds.map(
          (id) => ({ id }),
        ));

      const employmentTypesWithoutErrors = employmentTypes
        .filter((result) => !(result instanceof Error)) as EmploymentType[][];

      return employmentTypesWithoutErrors.flat();
    }

    return null;
  }
}
