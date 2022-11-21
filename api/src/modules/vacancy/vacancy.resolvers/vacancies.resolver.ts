import { makeResolver } from '@/core';
import {
  GetVacanciesUseCaseResult,
  GetVacanciesUseCaseOptions,
  GetVacanciesUseCase,
} from '@/modules/vacancy/vacancy.useCases/GetVacancies.useCase';

export const vacanciesResolver = makeResolver<
  GetVacanciesUseCaseOptions,
  GetVacanciesUseCaseResult
>(
  GetVacanciesUseCase,
);
