import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { Specialization } from '@/graphql/generated';

export interface GetVacancySpecializationsUseCaseOptions {
  vacancyId: number;
}
export type GetVacancySpecializationsUseCaseResult = Specialization[];

type Options = GetVacancySpecializationsUseCaseOptions;
type Result = GetVacancySpecializationsUseCaseResult;

export class GetVacancySpecializationsUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      vacancyId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.dataLoaders.specializationByVacancyId.load({
      vacancyId: options.vacancyId,
    });
  }
}
