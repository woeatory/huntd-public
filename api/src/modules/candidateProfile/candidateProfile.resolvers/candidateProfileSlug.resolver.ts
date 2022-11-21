import { makeResolver } from '@/core';
import {
  GetCandidateProfileSlugUseCase,
  GetCandidateProfileSlugUseCaseOptions,
  GetCandidateProfileSlugUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetCandidateProfileSlug.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileSlugResolver = makeResolver<
  unknown,
  GetCandidateProfileSlugUseCaseResult,
  GetCandidateProfileSlugUseCaseOptions,
  CandidateProfile
>(
  GetCandidateProfileSlugUseCase,
  (args, candidateProfile) => ({
    candidateProfile,
  }),
);
