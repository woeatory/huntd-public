import { ValidationRules } from '@mate-academy/core';
import { JobExperience } from '@/models/JobExperience';
import { UseCase } from '@/core';

export interface GetVacancyJobExperienceUseCaseOptions {
  jobExperienceId?: number;
}
export type GetVacancyJobExperienceUseCaseResult = JobExperience[] | null;

type Options = GetVacancyJobExperienceUseCaseOptions;
type Result = GetVacancyJobExperienceUseCaseResult;

export class GetVacancyJobExperienceUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      jobExperienceId: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!options.jobExperienceId) {
      return null;
    }

    return this.dataLoaders.jobExperienceById.load({
      id: options.jobExperienceId,
    });
  }
}
