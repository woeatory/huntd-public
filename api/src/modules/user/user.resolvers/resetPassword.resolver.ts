import { makeResolver } from '@/core';
import { ResetPasswordUseCaseOptions, ResetPasswordUseCaseResult, ResetPasswordUseCase } from '@/modules/user/user.useCases/ResetPassword.useCase';

export const resetPasswordResolver = makeResolver<
  ResetPasswordUseCaseOptions, ResetPasswordUseCaseResult
>(
  ResetPasswordUseCase,
);
