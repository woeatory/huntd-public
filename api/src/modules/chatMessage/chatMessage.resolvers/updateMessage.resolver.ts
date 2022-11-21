import { makeAuthResolver } from '@/core';
import {
  UpdateMessageUseCase,
  UpdateMessageUseCaseOptions,
  UpdateMessageUseCaseResult,
} from '@/modules/chatMessage/chatMessage.useCases/UpdateMessage.useCase';

export const updateMessageResolver = makeAuthResolver<
  UpdateMessageUseCaseOptions,
  UpdateMessageUseCaseResult
>(
  UpdateMessageUseCase,
);
