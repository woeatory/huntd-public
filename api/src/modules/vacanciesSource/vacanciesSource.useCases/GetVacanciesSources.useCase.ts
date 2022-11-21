import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { VacanciesSource } from '@/models/VacanciesSource';
import { VacanciesSourcesRepository } from '../vacanciesSource.repository';

export type GetVacanciesSourcesUseCaseOptions = unknown;
export type GetVacanciesSourcesUseCaseResult = VacanciesSource[];

type Options = GetVacanciesSourcesUseCaseOptions;
type Result = GetVacanciesSourcesUseCaseResult;

export class GetVacanciesSourcesUseCase extends ServiceUseCase<
  Options, Result
> {
  private readonly vacanciesSourcesRepository = this.makeRepository(
    VacanciesSourcesRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.vacanciesSourcesRepository.findAllVacanciesSources();
  }
}
