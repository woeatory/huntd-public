import { makeAuthResolver } from '@/core';
import {
  CreateVacanciesSourceUseCase,
  CreateVacanciesSourceUseCaseOptions,
  CreateVacanciesSourceUseCaseResult,
} from '@/modules/vacanciesSource/vacanciesSource.useCases/CreateVacanciesSource.useCase';

export const createVacanciesSourceResolver = makeAuthResolver<
  CreateVacanciesSourceUseCaseOptions,
  CreateVacanciesSourceUseCaseResult
>(
  CreateVacanciesSourceUseCase,
);
