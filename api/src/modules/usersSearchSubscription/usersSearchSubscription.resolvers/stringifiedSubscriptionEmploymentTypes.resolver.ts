import { makeResolver } from '@/core';
import {
  GetStringifiedSubscriptionEmploymentTypesUseCase,
  GetStringifiedSubscriptionEmploymentTypesUseCaseOptions,
  GetStringifiedSubscriptionEmploymentTypesUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetStringifiedSubscriptionEmploymentTypes.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const stringifiedSubscriptionEmploymentTypesResolver = makeResolver<
  unknown,
  GetStringifiedSubscriptionEmploymentTypesUseCaseResult,
  GetStringifiedSubscriptionEmploymentTypesUseCaseOptions,
  UsersSearchSubscription
>(
  GetStringifiedSubscriptionEmploymentTypesUseCase,
  (args, subscription) => ({
    subscriptionId: subscription.id,
  }),
);
