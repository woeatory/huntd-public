import { combineResolvers } from 'graphql-resolvers';
import { makeSubscription } from '@/core';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { User } from '@/models/User';
import { UserEvents } from '@/modules/user/user.events';

export interface UserUnreadMessagesCountUpdatedPayload {
  userUnreadMessagesCountUpdated: User | null
}

export const userUnreadMessagesCountUpdatedResolver = combineResolvers(
  isUserAuthenticatedGuard,
  makeSubscription<UserUnreadMessagesCountUpdatedPayload>(
    UserEvents.UserUnreadMessagesCountUpdated,
    async (
      payload,
      args,
      ctx,
    ) => payload.userUnreadMessagesCountUpdated?.id === ctx.authUser?.id,
  ),
);
