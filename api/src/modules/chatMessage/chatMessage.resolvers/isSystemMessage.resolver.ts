import { makeResolver } from '@/core';
import {
  GetIsSystemMessageUseCase,
  GetIsSystemMessageUseCaseOptions,
  GetIsSystemMessageUseCaseResult,
} from '@/modules/chatMessage/chatMessage.useCases/GetIsSystemMessage.useCase';
import { ChatMessage } from '@/models/ChatMessage';

export const isSystemMessageResolver = makeResolver<
  unknown,
  GetIsSystemMessageUseCaseResult,
  GetIsSystemMessageUseCaseOptions,
  ChatMessage
  >(
    GetIsSystemMessageUseCase,
    (args, chatMessage) => ({
      recipientUserId: chatMessage.recipientUserId,
      senderUserId: chatMessage.senderUserId,
    }),
  );
