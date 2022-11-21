import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  UnsubscribeFromCandidatesSearchUseCaseResult,
  UnsubscribeFromCandidatesSearchUseCaseOptions,
  UnsubscribeFromCandidatesSearchUseCase,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/UnsubscribeFromCandidatesSearch.useCase';

export const unsubscribeFromCandidatesSearchResolver = makeAuthResolver<
  UnsubscribeFromCandidatesSearchUseCaseOptions & { userId: number },
  UnsubscribeFromCandidatesSearchUseCaseResult,
  UnsubscribeFromCandidatesSearchUseCaseOptions
>(
  UnsubscribeFromCandidatesSearchUseCase,
  (args) => ({
    id: args.id,
  }),
  [
    (parent, args, ctx) => {
      if (ctx.authUser?.id === args.userId || ctx?.authUser?.isAdminUser) {
        return skip;
      }

      throw new ForbiddenError('forbidden');
    },
  ],
);
