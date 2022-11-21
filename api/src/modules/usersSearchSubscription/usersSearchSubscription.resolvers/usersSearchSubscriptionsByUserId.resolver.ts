import {
  GetUserSearchSubscriptionByUserIdUseCase,
  GetUserSearchSubscriptionByUserIdUseCaseOptions,
  GetUserSearchSubscriptionByUserIdUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetUsersSearchSubscriptionByUserId.useCase';
import { makeResolver } from '@/core';

export const usersSearchSubscriptionsByUserIdResolver = makeResolver<
  GetUserSearchSubscriptionByUserIdUseCaseOptions,
  GetUserSearchSubscriptionByUserIdUseCaseResult
>(
  GetUserSearchSubscriptionByUserIdUseCase,
);
