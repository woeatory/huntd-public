import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { VacancyRepository } from '../vacancy.repository';

export type DeleteObsoleteSourcedVacanciesUseCaseOptions = unknown;
export type DeleteObsoleteSourcedVacanciesUseCaseResult = number;

type Options = DeleteObsoleteSourcedVacanciesUseCaseOptions;
type Result = DeleteObsoleteSourcedVacanciesUseCaseResult;

export class DeleteObsoleteSourcedVacanciesUseCase extends ServiceUseCase<
  Options,
  Result
> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  private readonly vacancyRepository = this.makeRepository(
    VacancyRepository,
  )

  protected async run(): Promise<Result> {
    return this.vacancyRepository.deleteOutdatedSourcedVacancies();
  }
}
