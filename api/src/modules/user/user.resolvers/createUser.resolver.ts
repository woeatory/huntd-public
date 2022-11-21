import { makeAuthResolver } from '@/core';
import {
  CreateUserUseCase,
  CreateUserUseCaseOptions,
  CreateUserUseCaseResult,
} from '@/modules/user/user.useCases/CreateUser.useCase';

export const createUserResolver = makeAuthResolver<
  CreateUserUseCaseOptions,
  CreateUserUseCaseResult
>(
  CreateUserUseCase,
);
