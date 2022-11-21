import { User } from '@/models/User';
import { makeResolver } from '@/core';
import {
  IsAuthUserUseCase,
  IsAuthUserUseCaseOptions,
  IsAuthUserUseCaseResult,
} from '@/modules/user/user.useCases/isAuthUser.useCase';

export const isAuthUserResolver = makeResolver<
  unknown,
  IsAuthUserUseCaseResult,
  IsAuthUserUseCaseOptions,
  User
>(
  IsAuthUserUseCase,
  (args, user) => ({ userId: user.id }),
);
