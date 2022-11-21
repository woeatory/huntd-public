import { makeResolver } from '@/core';
import {
  GetProfileSpecializationUseCase,
  GetProfileSpecializationUseCaseOptions,
  GetProfileSpecializationUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileSpecialization.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const specializationResolver = makeResolver<
  unknown,
  GetProfileSpecializationUseCaseResult,
  GetProfileSpecializationUseCaseOptions,
  CandidateProfile
>(
  GetProfileSpecializationUseCase,
  (args, candidateProfile) => ({
    specializationId: candidateProfile.specializationId,
  }),
);
