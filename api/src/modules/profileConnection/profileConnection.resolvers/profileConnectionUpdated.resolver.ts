import { combineResolvers } from 'graphql-resolvers';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { makeSubscription } from '@/core';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ProfileConnectionEvents } from '@/modules/profileConnection/profileConnection.constants';

export interface ProfileConnectionUpdatedSubscriptionPayload {
  profileConnectionUpdated: ProfileConnection
}
export const profileConnectionUpdatedResolver = combineResolvers(
  isUserAuthenticatedGuard,
  makeSubscription<ProfileConnectionUpdatedSubscriptionPayload>(
    ProfileConnectionEvents.ProfileConnectionUpdated,
    (payload, args, ctx) => {
      const { profileConnectionUpdated: profileConnection } = payload;

      return profileConnection.recruiterUserId === ctx.authUser?.id
      || profileConnection.candidateUserId === ctx.authUser?.id;
    },
  ),
);
