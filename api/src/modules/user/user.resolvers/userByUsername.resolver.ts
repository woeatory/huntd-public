import { makeResolver } from '@/core';
import {
  GetUserByUsernameUseCase,
  GetUserByUsernameUseCaseOptions,
  GetUserByUsernameUseCaseResult,
} from '@/modules/user/user.useCases/GetUserByUsername.useCase';

export const userByUsernameResolver = makeResolver<
  GetUserByUsernameUseCaseOptions,
  GetUserByUsernameUseCaseResult
>(
  GetUserByUsernameUseCase,
);
