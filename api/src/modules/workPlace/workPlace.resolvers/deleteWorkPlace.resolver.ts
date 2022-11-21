import { makeAuthResolver } from '@/core';
import {
  DeleteWorkPlaceUseCaseOptions,
  DeleteWorkPlaceUseCaseResult,
  DeleteWorkPlaceUseCase,
} from '@/modules/workPlace/workPlace.useCases/DeleteWorkPlace.useCase';

export const deleteWorkPlaceResolver = makeAuthResolver<
  DeleteWorkPlaceUseCaseOptions,
  DeleteWorkPlaceUseCaseResult
>(
  DeleteWorkPlaceUseCase,
);
