import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  GetVacanciesSourcesUseCase,
  GetVacanciesSourcesUseCaseOptions,
  GetVacanciesSourcesUseCaseResult,
} from '../vacanciesSource.useCases/GetVacanciesSources.useCase';

export const vacanciesSourcesResolver = makeServiceResolver<
  GetVacanciesSourcesUseCaseOptions,
  GetVacanciesSourcesUseCaseResult
>(
  GetVacanciesSourcesUseCase,
);
