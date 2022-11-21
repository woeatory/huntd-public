import { makeResolver } from '@/core';
import {
  GetProfileTechnologiesUseCase,
  GetProfileTechnologiesUseCaseOptions,
  GetProfileTechnologiesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileTechnologies.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const technologiesResolver = makeResolver<
  unknown,
  GetProfileTechnologiesUseCaseResult,
  GetProfileTechnologiesUseCaseOptions,
  CandidateProfile
>(
  GetProfileTechnologiesUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
