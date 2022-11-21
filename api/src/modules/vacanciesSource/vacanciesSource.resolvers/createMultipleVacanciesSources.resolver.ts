import { makeAuthResolver } from '@/core';
import {
  CreateMultipleVacanciesSourcesUseCase,
  CreateMultipleVacanciesSourcesUseCaseOptions,
  CreateMultipleVacanciesSourcesUseCaseResult,
} from '@/modules/vacanciesSource/vacanciesSource.useCases/CreateMultipleVacanciesSources.useCase';

export const createMultipleVacanciesSourcesResolver = makeAuthResolver<
  CreateMultipleVacanciesSourcesUseCaseOptions,
  CreateMultipleVacanciesSourcesUseCaseResult
>(
  CreateMultipleVacanciesSourcesUseCase,
);
