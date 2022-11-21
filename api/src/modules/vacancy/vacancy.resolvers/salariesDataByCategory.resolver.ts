import { makeResolver } from '@/core';
import {
  GetSalariesDataByCategoryUseCase,
  GetSalariesDataByCategoryUseCaseOptions,
  GetSalariesDataByCategoryUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetSalariesDataByCategory.useCase';

export const salariesDataByCategoryResolver = makeResolver<
  GetSalariesDataByCategoryUseCaseOptions,
  GetSalariesDataByCategoryUseCaseResult
>(
  GetSalariesDataByCategoryUseCase,
);
