import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacancyRepository } from '@/modules/vacancy/vacancy.repository';

export type AddVacanciesLogoUseCaseOptions = {
  companyNames: string[];
};

export type AddVacanciesLogoUseCaseResult = any;

type Options = AddVacanciesLogoUseCaseOptions;
type Result = AddVacanciesLogoUseCaseResult;

export class AddVacanciesLogoUseCase extends AuthUseCase<Options, Result> {
  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      companyNames: [{
        list_of: ['required', 'string'],
      }],
    };
  }

  protected async run(
    options: Options,
  ): Promise<Result> {
    return this.vacancyRepository.addVacanciesLogo(options);
  }
}
