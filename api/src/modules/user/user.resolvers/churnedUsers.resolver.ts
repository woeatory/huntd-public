import { makeResolver } from '@/core';
import {
  GetChurnedUsersUseCase,
  GetChurnedUsersUseCaseOptions,
  GetChurnedUsersUseCaseResult,
} from '@/modules/user/user.useCases/GetChurnedUsers.useCase';

export const churnedUsersResolver = makeResolver<
  GetChurnedUsersUseCaseOptions,
  GetChurnedUsersUseCaseResult
  >(
    GetChurnedUsersUseCase,
  );
