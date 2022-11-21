import { makeAuthResolver } from '@/core';
import {
  UpdateConnectionLastActionTimeUseCase,
  UpdateConnectionLastActionTimeUseCaseOptions,
  UpdateConnectionLastActionTimeUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/UpdateConnectionLastActionTime.useCase';

export const updateConnectionLastActionTimeResolver = makeAuthResolver<
  UpdateConnectionLastActionTimeUseCaseOptions,
  UpdateConnectionLastActionTimeUseCaseResult
>(
  UpdateConnectionLastActionTimeUseCase,
);
