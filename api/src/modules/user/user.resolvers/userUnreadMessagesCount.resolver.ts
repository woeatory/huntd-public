import { GetUserUnreadMessagesUseCase, GetUserUnreadMessagesUseCaseOptions, GetUserUnreadMessagesUseCaseResult } from '@/modules/user/user.useCases/GetUserUnreadMessages.useCase';
import { makeResolver } from '@/core';
import { User } from '@/models/User';

export const userUnreadMessagesCountResolver = makeResolver<
  unknown,
  GetUserUnreadMessagesUseCaseResult,
  GetUserUnreadMessagesUseCaseOptions,
  User
>(
  GetUserUnreadMessagesUseCase,
  (args, user) => ({
    userId: user.id,
  }),
);
