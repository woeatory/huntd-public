import { makeAuthResolver } from '@/core';
import {
  UpdateCandidateProfileUseCase,
  UpdateCandidateProfileUseCaseOptions,
  UpdateCandidateProfileUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/UpdateCandidateProfile.useCase';

export const updateCandidateProfileResolver = makeAuthResolver<
  UpdateCandidateProfileUseCaseOptions,
  UpdateCandidateProfileUseCaseResult
>(
  UpdateCandidateProfileUseCase,
);
