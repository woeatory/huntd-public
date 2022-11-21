import { makeAuthResolver } from '@/core';
import {
  GetUserHiresUseCase,
  GetUserHiresUseCaseOptions,
  GetUserHiresUseCaseResult,
} from '@/modules/user/user.useCases/GetUserHires.useCase';
import { User } from '@/models/User';

export const hiresResolver = makeAuthResolver<
  { archived?: boolean },
  GetUserHiresUseCaseResult,
  GetUserHiresUseCaseOptions,
  User
>(
  GetUserHiresUseCase,
  (args, user) => ({
    userId: user.id,
  }),
);
