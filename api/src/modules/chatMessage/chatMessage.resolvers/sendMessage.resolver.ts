import { makeAuthResolver } from '@/core';
import {
  SendMessageUseCase,
  SendMessageUseCaseOptions,
  SendMessageUseCaseResult,
} from '@/modules/chatMessage/chatMessage.useCases/SendMessage.useCase';

export const sendMessageResolver = makeAuthResolver<
  SendMessageUseCaseOptions,
  SendMessageUseCaseResult
>(
  SendMessageUseCase,
);
