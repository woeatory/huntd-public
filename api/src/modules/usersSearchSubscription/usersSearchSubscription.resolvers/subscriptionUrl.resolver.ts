import { makeAuthResolver } from '@/core';
import {
  GetSubscriptionUrlUseCase,
  GetSubscriptionUrlUseCaseOptions,
  GetSubscriptionUrlUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetSubscriptionUrl.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const subscriptionUrlResolver = makeAuthResolver<
  unknown,
  GetSubscriptionUrlUseCaseResult,
  GetSubscriptionUrlUseCaseOptions,
  UsersSearchSubscription
>(
  GetSubscriptionUrlUseCase,
  (args, subscription) => ({
    searchParams: subscription.searchParams,
  }),
);
