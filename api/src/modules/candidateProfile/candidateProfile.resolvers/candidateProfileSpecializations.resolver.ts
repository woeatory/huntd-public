import { makeResolver } from '@/core';
import {
  GetProfileSpecializationsUseCase,
  GetProfileSpecializationsUseCaseOptions,
  GetProfileSpecializationsUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileSpecializations.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileSpecializationsResolver = makeResolver<
  unknown,
  GetProfileSpecializationsUseCaseResult,
  GetProfileSpecializationsUseCaseOptions,
  CandidateProfile
>(
  GetProfileSpecializationsUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
