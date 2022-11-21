import { makeResolver } from '@/core';
import {
  GetStringifiedSubscriptionSearchParamsUseCase,
  GetStringifiedSubscriptionSearchParamsUseCaseOptions,
  GetStringifiedSubscriptionSearchParamsUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetStringifiedSubscriptionSearchParams.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const stringifiedSearchParamsResolver = makeResolver<
  unknown,
  GetStringifiedSubscriptionSearchParamsUseCaseResult,
  GetStringifiedSubscriptionSearchParamsUseCaseOptions,
  UsersSearchSubscription
>(
  GetStringifiedSubscriptionSearchParamsUseCase,
  (args, subscription) => ({
    subscriptionId: subscription.id,
  }),
);
