import { makeAuthResolver } from '@/core';
import {
  GetConnectionChatMessagesUseCase,
  GetConnectionChatMessagesUseCaseOptions,
  GetConnectionChatMessagesUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionChatMessages.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const chatMessagesResolver = makeAuthResolver<
  unknown,
  GetConnectionChatMessagesUseCaseResult,
  GetConnectionChatMessagesUseCaseOptions,
  ProfileConnection
>(
  GetConnectionChatMessagesUseCase,
  (args, profileConnection) => ({ profileConnectionId: profileConnection.id }),
);
