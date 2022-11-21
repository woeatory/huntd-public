import { makeResolver } from '@/core';
import {
  GetLatestCandidateProfileUseCase,
  GetLatestCandidateProfileUseCaseOptions,
  GetLatestCandidateProfileUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetLatestCandidateProfile.useCase';

export const latestCandidateProfileResolver = makeResolver<
  GetLatestCandidateProfileUseCaseOptions,
  GetLatestCandidateProfileUseCaseResult
>(
  GetLatestCandidateProfileUseCase,
);
