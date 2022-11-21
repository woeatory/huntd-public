import { makeResolver } from '@/core';
import {
  GetFeaturesUseCase,
  GetFeaturesUseCaseOptions, GetFeaturesUseCaseResult,
} from '@/modules/feature/feature.useCases/GetFeatures.useCase';

export const featuresResolver = makeResolver<
  GetFeaturesUseCaseOptions,
  GetFeaturesUseCaseResult
>(
  GetFeaturesUseCase,
);
