import { makeAuthResolver } from '@/core';
import {
  SendProfileConnectionRequestUseCase,
  SendProfileConnectionRequestUseCaseOptions,
  SendProfileConnectionRequestUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/SendProfileConnectionRequest.useCase';

export const sendProfileConnectionRequestResolver = makeAuthResolver<
  SendProfileConnectionRequestUseCaseOptions,
  SendProfileConnectionRequestUseCaseResult
>(
  SendProfileConnectionRequestUseCase,
);
