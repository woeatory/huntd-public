import { makeResolver } from '@/core';
import {
  GetMessageUserUseCase,
  GetMessageUserUseCaseOptions,
  GetMessageUserUseCaseResult,
} from '@/modules/chatMessage/chatMessage.useCases/GetMessageUser.useCase';
import { ChatMessage } from '@/models/ChatMessage';

export const recipientUserResolver = makeResolver<
  unknown,
  GetMessageUserUseCaseResult,
  GetMessageUserUseCaseOptions,
  ChatMessage
>(
  GetMessageUserUseCase,
  (args, chatMessage) => ({ id: chatMessage.recipientUserId }),
);
