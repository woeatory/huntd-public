import { makeAuthResolver } from '@/core';
import {
  IsFirstTimeFillingRecruiterProfileUseCase,
  IsFirstTimeFillingRecruiterProfileUseCaseOptions,
  IsFirstTimeFillingRecruiterProfileUseCaseResult,
} from '@/modules/user/user.useCases/isFirstTimeFillingRecruiterProfileUseCaseResult.useCase';
import { User } from '@/models/User';

export const isFirstTimeFillingRecruiterProfileResolver = makeAuthResolver<
  unknown,
  IsFirstTimeFillingRecruiterProfileUseCaseResult,
  IsFirstTimeFillingRecruiterProfileUseCaseOptions,
  User
>(
  IsFirstTimeFillingRecruiterProfileUseCase,
  (_, user) => ({
    userId: user.id,
  }),
);
