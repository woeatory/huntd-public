import { makeResolver } from '@/core';
import {
  GetCandidateProfileBySlugUseCase,
  GetCandidateProfileBySlugUseCaseOptions,
  GetCandidateProfileBySlugUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetCandidateProfileBySlug.useCase';

export const candidateProfileBySlugResolver = makeResolver<
  GetCandidateProfileBySlugUseCaseOptions,
  GetCandidateProfileBySlugUseCaseResult
>(
  GetCandidateProfileBySlugUseCase,
);
