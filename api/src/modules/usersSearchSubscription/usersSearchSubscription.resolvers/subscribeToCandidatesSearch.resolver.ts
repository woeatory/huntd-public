import { makeAuthResolver } from '@/core';
import {
  SubscribeToCandidatesSearchUseCaseOptions,
  SubscribeToCandidatesSearchUseCaseResult,
  SubscribeToCandidatesSearchUseCase,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/SubscribeToCandidatesSearch.useCase';

export const subscribeToCandidatesSearchResolver = makeAuthResolver<
  SubscribeToCandidatesSearchUseCaseOptions,
  SubscribeToCandidatesSearchUseCaseResult
>(
  SubscribeToCandidatesSearchUseCase,
);
