import { makeAuthResolver } from '@/core';
import {
  CreateWorkPlaceUseCaseOptions,
  CreateWorkPlaceUseCaseResult,
  CreateWorkPlaceUseCase,
} from '@/modules/workPlace/workPlace.useCases/CreateWorkPlace.useCase';

export const createWorkPlaceResolver = makeAuthResolver<
  CreateWorkPlaceUseCaseOptions,
  CreateWorkPlaceUseCaseResult
>(
  CreateWorkPlaceUseCase,
);
