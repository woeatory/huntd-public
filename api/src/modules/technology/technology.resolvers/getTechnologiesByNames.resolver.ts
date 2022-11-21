import { makeAuthResolver } from '@/core';
import {
  GetTechnologiesByNamesUseCase,
  GetTechnologiesByNamesUseCaseOptions,
  GetTechnologiesByNamesUseCaseResult,
} from '@/modules/technology/technology.useCases/GetTechnologiesByNames.useCase';

export const technologiesByNamesResolver = makeAuthResolver<
  GetTechnologiesByNamesUseCaseOptions,
  GetTechnologiesByNamesUseCaseResult
>(
  GetTechnologiesByNamesUseCase,
);
