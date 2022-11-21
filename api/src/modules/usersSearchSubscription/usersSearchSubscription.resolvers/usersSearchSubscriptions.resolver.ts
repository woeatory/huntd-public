import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  GetUsersSearchSubscriptionsUseCase,
  GetUsersSearchSubscriptionsUseCaseOptions,
  GetUsersSearchSubscriptionsUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/GetUsersSearchSubscriptions.useCase';

export const usersSearchSubscriptionsResolver = makeServiceResolver<
  GetUsersSearchSubscriptionsUseCaseOptions,
  GetUsersSearchSubscriptionsUseCaseResult
>(
  GetUsersSearchSubscriptionsUseCase,
);
