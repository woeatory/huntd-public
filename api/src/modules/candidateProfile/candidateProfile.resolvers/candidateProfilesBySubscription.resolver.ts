import { makeResolver } from '@/core';
import {
  GetCandidateProfilesBySubscriptionUseCase,
  GetCandidateProfilesBySubscriptionUseCaseOptions,
  GetCandidateProfilesBySubscriptionUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetCandidateProfilesBySubscription.useCase';

export const candidateProfilesBySubscriptionResolver = makeResolver<
  GetCandidateProfilesBySubscriptionUseCaseOptions,
  GetCandidateProfilesBySubscriptionUseCaseResult
>(
  GetCandidateProfilesBySubscriptionUseCase,
);
