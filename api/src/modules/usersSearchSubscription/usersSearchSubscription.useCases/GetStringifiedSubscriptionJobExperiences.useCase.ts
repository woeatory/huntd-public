import { ValidationRules } from '@mate-academy/core';
import { JobExperience } from '@/models/JobExperience';
import { UseCase } from '@/core';

export interface GetStringifiedSubscriptionJobExperiencesUseCaseOptions {
  subscriptionId: number;
}
export type GetStringifiedSubscriptionJobExperiencesUseCaseResult =
JobExperience[] | null;

type Options = GetStringifiedSubscriptionJobExperiencesUseCaseOptions;
type Result = GetStringifiedSubscriptionJobExperiencesUseCaseResult;

export class GetStringifiedSubscriptionJobExperiencesUseCase
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

    const experiencesIds = subscription?.searchParams.experienceIds;

    if (experiencesIds) {
      const jobExperiences = await this.dataLoaders
        .jobExperienceById.loadMany(experiencesIds.map(
          (id) => ({ id }),
        ));

      const jobExperiencesWithoutErrors = jobExperiences
        .filter((result) => !(result instanceof Error)) as JobExperience[][];

      return jobExperiencesWithoutErrors.flat();
    }

    return null;
  }
}
