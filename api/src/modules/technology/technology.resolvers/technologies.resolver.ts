import { makeResolver } from '@/core';
import {
  GetTechnologiesUseCase,
  GetTechnologiesUseCaseOptions,
  GetTechnologiesUseCaseResult,
} from '@/modules/technology/technology.useCases/GetTechnologies.useCase';

export const technologiesResolver = makeResolver<
  GetTechnologiesUseCaseOptions,
  GetTechnologiesUseCaseResult
>(
  GetTechnologiesUseCase,
);
