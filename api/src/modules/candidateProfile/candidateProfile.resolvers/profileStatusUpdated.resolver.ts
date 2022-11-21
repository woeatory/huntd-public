import { combineResolvers } from 'graphql-resolvers';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { makeSubscription } from '@/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { CandidateProfileEvents } from '@/modules/candidateProfile/candidateProfile.constants';

export interface ProfileStatusUpdatedSubscriptionPayload {
  candidateProfileStatusUpdated: CandidateProfile
}
export const candidateProfileStatusUpdatedResolver = combineResolvers(
  isUserAuthenticatedGuard,
  makeSubscription<ProfileStatusUpdatedSubscriptionPayload>(
    CandidateProfileEvents.StatusUpdated,
    (payload, args, ctx) => {
      const { candidateProfileStatusUpdated: candidateProfile } = payload;

      return candidateProfile.userId === ctx.authUser?.id;
    },
  ),
);
