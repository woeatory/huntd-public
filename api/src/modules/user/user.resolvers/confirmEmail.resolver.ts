import { makeResolver } from '@/core';
import { ConfirmEmailUseCaseOptions, ConfirmEmailUseCaseResult, ConfirmEmailUseCase } from '@/modules/user/user.useCases/ConfirmEmail.useCase';

export const confirmEmailResolver = makeResolver<
ConfirmEmailUseCaseOptions, ConfirmEmailUseCaseResult
>(
  ConfirmEmailUseCase,
);
