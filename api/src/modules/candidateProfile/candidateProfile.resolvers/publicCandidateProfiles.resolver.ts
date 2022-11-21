import { makeResolver } from '@/core';
import {
  GetPublicCandidateProfilesUseCase,
  GetPublicCandidateProfilesUseCaseOptions,
  GetPublicCandidateProfilesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetPublicCandidateProfiles.useCase';

export const publicCandidateProfilesResolver = makeResolver<
  GetPublicCandidateProfilesUseCaseOptions,
  GetPublicCandidateProfilesUseCaseResult
>(
  GetPublicCandidateProfilesUseCase,
);
