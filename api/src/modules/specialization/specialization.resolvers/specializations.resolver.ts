import { makeResolver } from '@/core';
import {
  GetSpecializationsUseCaseOptions,
  GetSpecializationsUseCaseResult,
  GetSpecializationsUseCase,
} from '@/modules/specialization/specialization.useCases/GetSpecializations.useCase';

export const specializationsResolver = makeResolver<
  GetSpecializationsUseCaseOptions,
  GetSpecializationsUseCaseResult
>(
  GetSpecializationsUseCase,
);
