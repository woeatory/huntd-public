import { makeResolver } from '@/core';
import {
  GetUnreadMessagesCountUseCase,
  GetUnreadMessagesCountUseCaseOptions,
  GetUnreadMessagesCountUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetUnreadMessagesCount.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const profileConnectionUnreadMessagesCount = makeResolver<
  unknown,
  GetUnreadMessagesCountUseCaseResult,
  GetUnreadMessagesCountUseCaseOptions,
  ProfileConnection
>(
  GetUnreadMessagesCountUseCase,
  (args, profileConnection) => ({
    profileConnectionId: profileConnection.id,
  }),
);
