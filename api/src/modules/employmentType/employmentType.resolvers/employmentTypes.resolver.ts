import {
  GetEmploymentTypesUseCase,
  GetEmploymentTypesUseCaseOptions,
  GetEmploymentTypesUseCaseResult,
} from '@/modules/employmentType/employmentType.useCases/GetEmploymentTypes.useCase';
import { makeResolver } from '@/core';

export const employmentTypesResolver = makeResolver<
  GetEmploymentTypesUseCaseOptions,
  GetEmploymentTypesUseCaseResult
>(
  GetEmploymentTypesUseCase,
);
