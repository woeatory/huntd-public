import { makeAuthResolver } from '@/core';
import {
  DeleteProfileConnectionForUserUseCase,
  DeleteProfileConnectionForUserUseCaseOptions,
  DeleteProfileConnectionForUserUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/DeleteProfileConnectionForUser.useCase';

export const deleteProfileConnectionForUserResolver = makeAuthResolver<
  DeleteProfileConnectionForUserUseCaseOptions,
  DeleteProfileConnectionForUserUseCaseResult
>(
  DeleteProfileConnectionForUserUseCase,
);
