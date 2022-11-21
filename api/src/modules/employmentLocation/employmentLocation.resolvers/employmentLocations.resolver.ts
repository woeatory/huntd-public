import {
  GetEmploymentLocationsUseCase,
  GetEmploymentLocationsUseCaseOptions,
  GetEmploymentLocationsUseCaseResult,
} from '@/modules/employmentLocation/employmentLocation.useCases/GetEmploymentLocations.useCase';
import { makeResolver } from '@/core';

export const employmentLocationsResolver = makeResolver<
  GetEmploymentLocationsUseCaseOptions,
  GetEmploymentLocationsUseCaseResult
>(
  GetEmploymentLocationsUseCase,
);
