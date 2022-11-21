import { makeResolver } from '@/core';
import {
  GetStringifiedSubscriptionJobExperiencesUseCase,
  GetStringifiedSubscriptionJobExperiencesUseCaseArgs,
  GetStringifiedSubscriptionJobExperiencesUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetStringifiedSubscriptionJobExperiences.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const stringifiedSubscriptionJobExperiencesResolver = makeResolver<
  unknown,
  GetStringifiedSubscriptionJobExperiencesUseCaseResult,
  GetStringifiedSubscriptionJobExperiencesUseCaseArgs,
  UsersSearchSubscription
>(
  GetStringifiedSubscriptionJobExperiencesUseCase,
  (args, subscription) => ({
    subscriptionId: subscription.id,
  }),
);
