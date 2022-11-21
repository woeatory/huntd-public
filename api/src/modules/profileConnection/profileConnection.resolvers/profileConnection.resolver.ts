import { makeResolver } from '@/core';
import {
  GetProfileConnectionUseCase,
  GetProfileConnectionUseCaseOptions,
  GetProfileConnectionUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetProfileConnection.useCase';

export const profileConnectionResolver = makeResolver<
  GetProfileConnectionUseCaseOptions,
  GetProfileConnectionUseCaseResult
>(
  GetProfileConnectionUseCase,
);
