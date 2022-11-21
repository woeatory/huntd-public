import { combineResolvers } from 'graphql-resolvers';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { makeSubscription } from '@/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { RecruiterProfileEvents } from '@/modules/recruiterProfile/recruiterProfile.constants';

export interface RecruiterStatusUpdatedSubscriptionPayload {
  recruiterProfileStatusUpdated: RecruiterProfile
}
export const recruiterProfileStatusUpdatedResolver = combineResolvers(
  isUserAuthenticatedGuard,
  makeSubscription<RecruiterStatusUpdatedSubscriptionPayload>(
    RecruiterProfileEvents.StatusUpdated,
    (payload, args, ctx) => {
      const { recruiterProfileStatusUpdated: recruiterProfile } = payload;

      return recruiterProfile.userId === ctx.authUser?.id;
    },
  ),
);
