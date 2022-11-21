import { makeAuthResolver } from '@/core';
import {
  ReviewProfileConnectionRequestUseCase,
  ReviewProfileConnectionRequestUseCaseOptions,
  ReviewProfileConnectionRequestUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/ReviewProfileConnectionRequest.useCase';

export const reviewProfileConnectionRequestResolver = makeAuthResolver<
  ReviewProfileConnectionRequestUseCaseOptions,
  ReviewProfileConnectionRequestUseCaseResult
>(
  ReviewProfileConnectionRequestUseCase,
);
