import { makeResolver } from '@/core';
import {
  GetUserLastActionTimeUseCase,
  GetUserLastActionTimeUseCaseOptions,
  GetUserLastActionTimeUseCaseResult,
} from '@/modules/user/user.useCases/GetUserLastActionTime.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const userLastActionTimeResolver = makeResolver<
  unknown,
  GetUserLastActionTimeUseCaseResult,
  GetUserLastActionTimeUseCaseOptions,
  CandidateProfile
  >(
    GetUserLastActionTimeUseCase,
    (args, candidateProfile) => ({
      userId: candidateProfile.userId,
    }),
  );
