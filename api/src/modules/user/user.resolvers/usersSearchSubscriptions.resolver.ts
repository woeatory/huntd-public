import { makeAuthResolver } from '@/core';
import { User } from '@/models/User';
import {
  GetUsersSearchSubscriptionsUseCase,
  GetUsersSearchSubscriptionsUseCaseOptions,
  GetUsersSearchSubscriptionsUseCaseResult,
} from '@/modules/user/user.useCases/GetUsersSearchSubscriptions.useCase';

export const usersSearchSubscriptionsResolver = makeAuthResolver<
  unknown,
  GetUsersSearchSubscriptionsUseCaseResult,
  GetUsersSearchSubscriptionsUseCaseOptions,
  User
>(
  GetUsersSearchSubscriptionsUseCase,
  (args, user) => ({
    userId: user.id,
  }),
);
