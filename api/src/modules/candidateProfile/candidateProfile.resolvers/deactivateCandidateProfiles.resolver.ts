import { makeAuthResolver } from '@/core';
import {
  DeactivateCandidateProfilesUseCase,
  DeactivateCandidateProfilesUseCaseOptions,
  DeactivateCandidateProfilesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/DeactivateCandidateProfiles.useCase';

export const deactivateCandidateProfilesResolver = makeAuthResolver<
  DeactivateCandidateProfilesUseCaseOptions,
  DeactivateCandidateProfilesUseCaseResult
>(
  DeactivateCandidateProfilesUseCase,
);
