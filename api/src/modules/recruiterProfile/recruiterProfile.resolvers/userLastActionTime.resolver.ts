import { makeResolver } from '@/core';
import {
  GetUserLastActionTimeUseCase,
  GetUserLastActionTimeUseCaseOptions,
  GetUserLastActionTimeUseCaseResult,
} from '@/modules/user/user.useCases/GetUserLastActionTime.useCase';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export const userLastActionTimeResolver = makeResolver<
  unknown,
  GetUserLastActionTimeUseCaseResult,
  GetUserLastActionTimeUseCaseOptions,
  RecruiterProfile
  >(
    GetUserLastActionTimeUseCase,
    (args, recruiterProfile) => ({
      userId: recruiterProfile.userId,
    }),
  );
