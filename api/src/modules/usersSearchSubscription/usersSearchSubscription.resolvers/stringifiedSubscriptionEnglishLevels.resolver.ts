import { makeResolver } from '@/core';
import {
  GetStringifiedSubscriptionEnglishLevelsUseCase,
  GetStringifiedSubscriptionEnglishLevelsUseCaseOptions,
  GetStringifiedSubscriptionEnglishLevelsUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetStringifiedSubscriptionEnglishLevels.useCase';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';

export const stringifiedSubscriptionEnglishLevelsResolver = makeResolver<
  unknown,
  GetStringifiedSubscriptionEnglishLevelsUseCaseResult,
  GetStringifiedSubscriptionEnglishLevelsUseCaseOptions,
  UsersSearchSubscription
>(
  GetStringifiedSubscriptionEnglishLevelsUseCase,
  (args, subscription) => ({
    subscriptionId: subscription.id,
  }),
);
