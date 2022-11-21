import { makeAuthResolver } from '@/core';
import {
  ChangePasswordUseCaseOptions,
  ChangePasswordUseCaseResult,
  ChangePasswordUseCase,
} from '@/modules/user/user.useCases/ChangePassword.useCase';

export const changePasswordResolver = makeAuthResolver<
  ChangePasswordUseCaseOptions, ChangePasswordUseCaseResult
>(
  ChangePasswordUseCase,
);
