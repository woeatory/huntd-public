import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  ReviewCandidateProfileUseCase,
  ReviewCandidateProfileUseCaseOptions,
  ReviewCandidateProfileUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/ReviewCandidateProfile.useCase';

export const reviewCandidateProfileResolver = makeServiceResolver<
  ReviewCandidateProfileUseCaseOptions,
  ReviewCandidateProfileUseCaseResult
>(
  ReviewCandidateProfileUseCase,
);
