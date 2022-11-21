import { makeAuthResolver } from '@/core';
import {
  IsFirstTimeFillingCandidateProfileUseCase,
  IsFirstTimeFillingCandidateProfileUseCaseOptions,
  IsFirstTimeFillingCandidateProfileUseCaseResult,
} from '@/modules/user/user.useCases/isFirstTimeFillingCandidateProfileUseCaseResult.useCase';
import { User } from '@/models/User';

export const isFirstTimeFillingCandidateProfileResolver = makeAuthResolver<
  unknown,
  IsFirstTimeFillingCandidateProfileUseCaseResult,
  IsFirstTimeFillingCandidateProfileUseCaseOptions,
  User
>(
  IsFirstTimeFillingCandidateProfileUseCase,
  (_, user) => ({
    userId: user.id,
  }),
);
