import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacancyRepository } from '@/modules/vacancy/vacancy.repository';
import { Vacancy } from '@/models/Vacancy';
import { FEATURES } from '@/modules/feature/initFeatures';
import { VacanciesOptions } from '@/modules/vacancy/vacancy.typedefs';
import { VACANCIES_QUERY_LIMIT } from '@/modules/vacancy/vacancy.constants';
import { VacancyService } from '../vacancy.service';

export type GetVacanciesUseCaseOptions = {
  options: VacanciesOptions;
  offset?: number;
};
export type GetVacanciesUseCaseResult = {
  rows: Vacancy[];
  hasMore: boolean;
};

type Options = GetVacanciesUseCaseOptions;
type Result = GetVacanciesUseCaseResult;

export class GetVacanciesUseCase extends AuthUseCase<Options, Result> {
  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  private readonly vacancyService = this.makeService(
    VacancyService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      options: [{
        nested_object: {
          keywords: [{
            list_of: ['required', 'string'],
          }],
        },
      }],
      offset: ['positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    let limit;
    let offset;

    if (this.features.isEnabled(FEATURES.jobsPagination)) {
      limit = VACANCIES_QUERY_LIMIT;
      offset = options.offset;
    }

    return this.vacancyService.findVacancies({
      vacanciesOptions: options.options,
      limit,
      offset,
    });
  }
}
