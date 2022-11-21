import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  UpdateSubscriptionLastNotifiedUseCase,
  UpdateSubscriptionLastNotifiedUseCaseOptions,
  UpdateSubscriptionLastNotifiedUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/UpdateSubscriptionLastNotified.useCase';

export const updateSubscriptionLastNotifiedResolver = makeServiceResolver<
  UpdateSubscriptionLastNotifiedUseCaseOptions,
  UpdateSubscriptionLastNotifiedUseCaseResult
>(
  UpdateSubscriptionLastNotifiedUseCase,
);
