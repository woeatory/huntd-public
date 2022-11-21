import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { VacanciesSourcesRepository } from '@/modules/vacanciesSource/vacanciesSource.repository';

export type GetHasVacanciesSourceUseCaseOptions = unknown;
export type GetHasVacanciesSourceUseCaseResult = boolean;

type Options = GetHasVacanciesSourceUseCaseOptions;
type Result = GetHasVacanciesSourceUseCaseResult;

export class GetHasVacanciesSourceUseCase extends AuthUseCase<Options, Result> {
  private readonly vacanciesSourcesRepository = this.makeRepository(
    VacanciesSourcesRepository,
  );

  protected get validation(): ValidationRules<Options> | null {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.vacanciesSourcesRepository
      .checkIfUserHasVacanciesSource(this.authUser.id);
  }
}
