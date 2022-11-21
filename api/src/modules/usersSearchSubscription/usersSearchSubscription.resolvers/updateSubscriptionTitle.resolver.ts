import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  UpdateSubscriptionTitleUseCase,
  UpdateSubscriptionTitleUseCaseOptions,
  UpdateSubscriptionTitleUseCaseResult,
} from '@/modules/usersSearchSubscription/usersSearchSubscription.useCases/UpdateSubscriptionTitle.useCase';

export const updateSubscriptionTitleResolver = makeAuthResolver<
  UpdateSubscriptionTitleUseCaseOptions & {userId: number},
  UpdateSubscriptionTitleUseCaseResult,
  UpdateSubscriptionTitleUseCaseOptions
>(
  UpdateSubscriptionTitleUseCase,
  (args) => ({
    values: args.values,
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
