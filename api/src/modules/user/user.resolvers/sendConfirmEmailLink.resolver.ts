import { makeAuthResolver } from '@/core';
import { SendConfirmEmailLinkUseCaseOptions, SendConfirmEmailLinkUseCaseResult, SendConfirmEmailLinkUseCase } from '@/modules/user/user.useCases/SendConfirmEmailLink.useCase';

export const sendConfirmEmailLinkResolver = makeAuthResolver<
  SendConfirmEmailLinkUseCaseOptions, SendConfirmEmailLinkUseCaseResult
>(
  SendConfirmEmailLinkUseCase,
);
