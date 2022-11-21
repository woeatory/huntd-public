import { ValidationRules } from '@mate-academy/core';
import { JobExperience } from '@/models/JobExperience';
import { UseCase } from '@/core';

export type GetJobExperiencesUseCaseOptions = unknown;
export type GetJobExperiencesUseCaseResult = JobExperience[];

type Options = GetJobExperiencesUseCaseOptions;
type Result = GetJobExperiencesUseCaseResult;

export class GetJobExperiencesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.JobExperience.findAll({
      order: [
        ['order', 'ASC'],
      ],
    });
  }
}
