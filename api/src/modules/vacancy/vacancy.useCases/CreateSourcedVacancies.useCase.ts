import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import {
  SourcedVacancy, VacancyCategoryEnum,
  VacancyStatusEnum, VacancyTypeEnum,
} from '../vacancy.typedefs';
import { VacancyRepository } from '../vacancy.repository';

export interface CreateSourcedVacanciesUseCaseOptions {
  vacancies: SourcedVacancy[];
}
export type CreateSourcedVacanciesUseCaseResult = number;

type Options = CreateSourcedVacanciesUseCaseOptions;
type Result = CreateSourcedVacanciesUseCaseResult;

export class CreateSourcedVacanciesUseCase extends ServiceUseCase<
  Options,
  Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      vacancies: [
        'required',
        {
          list_of_objects: [{
            sourceId: ['required', 'positive_integer'],
            userId: ['required', 'positive_integer'],
            companyName: ['required', 'string'],
            applyLink: ['required', 'string'],
            jobTitle: ['required', 'string'],
            jobDescription: ['required', 'string'],
            jobType: ['required', { one_of: Object.values(VacancyTypeEnum) }],
            jobCategory: ['required', { one_of: Object.values(VacancyCategoryEnum) }],
            status: ['required', { one_of: Object.values(VacancyStatusEnum) }],
            salaryFrom: ['decimal'],
            salaryTo: ['decimal'],
          }],
        },
      ],
    };
  }

  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  protected async run(options: Options): Promise<Result> {
    return this.vacancyRepository.createSourcedVacancies(options.vacancies);
  }
}
