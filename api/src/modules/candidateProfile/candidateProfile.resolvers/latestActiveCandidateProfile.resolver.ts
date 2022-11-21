import { makeResolver } from '@/core';
import {
  GetLatestActiveCandidateProfileUseCase,
  GetLatestActiveCandidateProfileUseCaseOptions,
  GetLatestActiveCandidateProfileUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetLatestActiveCandidateProfile.useCase';

export const latestActiveCandidateProfileResolver = makeResolver<
  GetLatestActiveCandidateProfileUseCaseOptions,
  GetLatestActiveCandidateProfileUseCaseResult
>(
  GetLatestActiveCandidateProfileUseCase,
);
