import { makeAuthResolver } from '@/core';
import {
  FetchWorkPlacesUseCase,
  FetchWorkPlacesUseCaseOptions,
  FetchWorkPlacesUseCaseResult,
} from '@/modules/workPlace/workPlace.useCases/FetchWorkPlaces.useCase';

export const fetchWorkPlacesResolver = makeAuthResolver<
  FetchWorkPlacesUseCaseOptions,
  FetchWorkPlacesUseCaseResult
>(
  FetchWorkPlacesUseCase,
);
