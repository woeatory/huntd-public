import { makeResolver } from '@/core';
import { ForgotPasswordUseCaseOptions, ForgotPasswordUseCaseResult, ForgotPasswordUseCase } from '@/modules/user/user.useCases/ForgotPassword.useCase';

export const forgotPasswordResolver = makeResolver<
  ForgotPasswordUseCaseOptions, ForgotPasswordUseCaseResult
>(
  ForgotPasswordUseCase,
);
