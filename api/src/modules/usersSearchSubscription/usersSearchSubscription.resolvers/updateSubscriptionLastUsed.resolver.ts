import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  UpdateSubscriptionLastUsedUseCase,
  UpdateSubscriptionLastUsedUseCaseOptions,
  UpdateSubscriptionLastUsedUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/UpdateSubscriptionLastUsed.useCase';

export const updateSubscriptionLastUsedResolver = makeAuthResolver<
  UpdateSubscriptionLastUsedUseCaseOptions & { userId: number },
  UpdateSubscriptionLastUsedUseCaseResult,
  UpdateSubscriptionLastUsedUseCaseOptions
>(
  UpdateSubscriptionLastUsedUseCase,
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
