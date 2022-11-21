import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacancyRepository } from '@/modules/vacancy/vacancy.repository';
import { Vacancy } from '@/models/Vacancy';
import { VacanciesByCompanyOptions } from '@/modules/vacancy/vacancy.typedefs';

export type GetVacanciesByCompanyUseCaseOptions = {
  options: VacanciesByCompanyOptions;
};
export type GetVacanciesByCompanyUseCaseResult = Vacancy[];

type Options = GetVacanciesByCompanyUseCaseOptions;
type Result = GetVacanciesByCompanyUseCaseResult;

export class GetVacanciesByCompanyUseCase extends AuthUseCase<Options, Result> {
  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      options: [{
        nested_object: {
          companyName: ['required', 'string'],
        },
      }],
    };
  }

  protected async run({ options }: Options): Promise<Result> {
    return this.vacancyRepository.findVacanciesByCompany(options);
  }
}
