import { makeResolver } from '@/core';
import {
  GetFeatureUseCase,
  GetFeatureUseCaseOptions, GetFeatureUseCaseResult,
} from '@/modules/feature/feature.useCases/GetFeature.useCase';

export const featureResolver = makeResolver<
  GetFeatureUseCaseOptions,
  GetFeatureUseCaseResult
>(
  GetFeatureUseCase,
);
