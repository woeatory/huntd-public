import { makeAuthResolver } from '@/core';
import {
  SendCandidateProfileToReviewUseCase,
  SendCandidateProfileToReviewUseCaseOptions,
  SendCandidateProfileToReviewUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/SendCandidateProfileToReview.useCase';

export const sendCandidateProfileToReviewResolver = makeAuthResolver<
  SendCandidateProfileToReviewUseCaseOptions,
  SendCandidateProfileToReviewUseCaseResult
>(
  SendCandidateProfileToReviewUseCase,
);
