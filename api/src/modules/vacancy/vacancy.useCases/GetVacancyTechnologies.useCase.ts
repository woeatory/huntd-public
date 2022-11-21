import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { Technology } from '@/models/Technology';

export interface GetVacancyTechnologiesUseCaseOptions {
  vacancyId: number;
}
export type GetVacancyTechnologiesUseCaseResult = Technology[]

type Options = GetVacancyTechnologiesUseCaseOptions;
type Result = GetVacancyTechnologiesUseCaseResult;

export class GetVacancyTechnologiesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      vacancyId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.technologyByVacancyId.load({
      vacancyId: options.vacancyId,
    });
  }
}
