import { makeResolver } from '@/core';
import {
  GetStringifiedSubscriptionTechnologiesUseCase,
  GetStringifiedSubscriptionTechnologiesUseCaseOptions,
  GetStringifiedSubscriptionTechnologiesUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetStringifiedSubscriptionTechnologies.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const stringifiedSubscriptionTechnologiesResolver = makeResolver<
  unknown,
  GetStringifiedSubscriptionTechnologiesUseCaseResult,
  GetStringifiedSubscriptionTechnologiesUseCaseOptions,
  UsersSearchSubscription
>(
  GetStringifiedSubscriptionTechnologiesUseCase,
  (args, subscription) => ({
    subscriptionId: subscription.id,
  }),
);
