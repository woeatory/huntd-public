import { makeAuthResolver } from '@/core';
import {
  UnarchiveProfileConnectionForUserUseCase,
  UnarchiveProfileConnectionForUserUseCaseOptions,
  UnarchiveProfileConnectionForUserUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/UnarchiveProfileConnectionForUser.useCase';

export const unarchiveProfileConnectionForUserResolver = makeAuthResolver<
  UnarchiveProfileConnectionForUserUseCaseOptions,
  UnarchiveProfileConnectionForUserUseCaseResult
>(
  UnarchiveProfileConnectionForUserUseCase,
);
