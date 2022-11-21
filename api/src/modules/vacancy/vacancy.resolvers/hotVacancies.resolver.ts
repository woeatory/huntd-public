import { makeResolver } from '@/core';
import {
  GetHotVacanciesUseCase,
  GetHotVacanciesUseCaseOptions,
  GetHotVacanciesUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetHotVacancies.useCase';

export const hotVacanciesResolver = makeResolver<
  GetHotVacanciesUseCaseOptions,
  GetHotVacanciesUseCaseResult
>(
  GetHotVacanciesUseCase,
);
