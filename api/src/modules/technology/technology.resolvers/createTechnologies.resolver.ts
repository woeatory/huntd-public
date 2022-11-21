import { makeResolver } from '@/core';
import {
  CreateTechnologiesUseCase,
  CreateTechnologiesUseCaseOptions,
  CreateTechnologiesUseCaseResult,
} from '@/modules/technology/technology.useCases/CreateTechnologies.useCase';

export const createTechnologiesResolver = makeResolver<
  CreateTechnologiesUseCaseOptions,
  CreateTechnologiesUseCaseResult
>(
  CreateTechnologiesUseCase,
);
