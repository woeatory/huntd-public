import { makeAuthResolver } from '@/core';
import {
  CreateTechnologyUseCase,
  CreateTechnologyUseCaseOptions,
  CreateTechnologyUseCaseResult,
} from '@/modules/technology/technology.useCases/CreateTechnology.useCase';

export const createTechnologyResolver = makeAuthResolver<
  CreateTechnologyUseCaseOptions,
  CreateTechnologyUseCaseResult
>(
  CreateTechnologyUseCase,
);
