import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacancyRepository } from '@/modules/vacancy/vacancy.repository';
import { Vacancy } from '@/models/Vacancy';

export type GetHotVacanciesUseCaseOptions = unknown;
export type GetHotVacanciesUseCaseResult = Vacancy[];

type Options = GetHotVacanciesUseCaseOptions;
type Result = GetHotVacanciesUseCaseResult;

export class GetHotVacanciesUseCase extends AuthUseCase<Options, Result> {
  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.vacancyRepository.findHotVacancies();
  }
}
