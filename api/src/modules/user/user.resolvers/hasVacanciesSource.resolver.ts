import { makeAuthResolver } from '@/core';
import {
  GetHasVacanciesSourceUseCase,
  GetHasVacanciesSourceUseCaseOptions,
  GetHasVacanciesSourceUseCaseResult,
} from '../user.useCases/GetHasVacanciesSource.useCase';

export const hasVacanciesSourceResolver = makeAuthResolver<
  GetHasVacanciesSourceUseCaseOptions,
  GetHasVacanciesSourceUseCaseResult
>(
  GetHasVacanciesSourceUseCase,
);
