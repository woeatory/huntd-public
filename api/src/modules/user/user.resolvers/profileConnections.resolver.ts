import { makeAuthResolver } from '@/core';
import {
  GetUserProfileConnectionsUseCase,
  GetUserProfileConnectionsUseCaseOptions,
  GetUserProfileConnectionsUseCaseResult,
} from '@/modules/user/user.useCases/GetUserProfileConnections.useCase';
import { User } from '@/models/User';

export const profileConnectionsResolver = makeAuthResolver<
  { archived?: boolean },
  GetUserProfileConnectionsUseCaseResult,
  GetUserProfileConnectionsUseCaseOptions,
  User
>(
  GetUserProfileConnectionsUseCase,
  (args, user) => ({
    userId: user.id,
    archived: !!args.archived,
  }),
);
