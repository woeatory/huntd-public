import { makeAuthResolver } from '@/core';
import {
  UpdateWorkPlaceUseCaseOptions,
  UpdateWorkPlaceUseCaseResult,
  UpdateWorkPlaceUseCase,
} from '@/modules/workPlace/workPlace.useCases/UpdateWorkPlace.useCase';

export const updateWorkPlaceResolver = makeAuthResolver<
  UpdateWorkPlaceUseCaseOptions,
  UpdateWorkPlaceUseCaseResult
>(
  UpdateWorkPlaceUseCase,
);
