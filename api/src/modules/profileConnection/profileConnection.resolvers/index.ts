import { sendProfileConnectionRequestResolver } from '@/modules/profileConnection/profileConnection.resolvers/sendProfileConnectionRequest.resolver';
import { reviewProfileConnectionRequestResolver } from '@/modules/profileConnection/profileConnection.resolvers/reviewProfileConnectionRequest.resolver';
import { candidateProfileResolver } from '@/modules/profileConnection/profileConnection.resolvers/candidateProfile.resolver';
import { recruiterProfileResolver } from '@/modules/profileConnection/profileConnection.resolvers/recruiterProfile.resolver';
import { profileConnectionCandidateUserResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionCandidateUser.resolver';
import { profileConnectionRecruiterUserResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionRecruiterUser.resolver';
import { chatMessagesResolver } from '@/modules/profileConnection/profileConnection.resolvers/chatMessages.resolver';
import { profileConnectionResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnection.resolver';
import { profileConnectionUpdatedResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionUpdated.resolver';
import { reportOfferStatusResolver } from '@/modules/profileConnection/profileConnection.resolvers/reportOfferStatus.resolver';
import { profileConnectionUserMetaResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionUserMeta.resolver';
import { profileConnectionBuddyMetaResolver } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionBuddyMeta.resolver';
import { profileConnectionUnreadMessagesCount } from '@/modules/profileConnection/profileConnection.resolvers/profileConnectionUnreadMessagesCount.resolver';
import { archiveProfileConnectionForUserResolver } from '@/modules/profileConnection/profileConnection.resolvers/archiveProfileConectionForUser.resolver';
import { deleteProfileConnectionForUserResolver } from '@/modules/profileConnection/profileConnection.resolvers/deleteProfileConectionForUser.resolver';
import { updateConnectionLastActionTimeResolver } from '@/modules/profileConnection/profileConnection.resolvers/updateConnectionLastActionTime.resolver';
import { unarchiveProfileConnectionForUserResolver } from '@/modules/profileConnection/profileConnection.resolvers/unarchiveProfileConectionForUser.resolver';

export const ProfileConnectionResolvers = {
  Subscription: {
    profileConnectionUpdated: {
      subscribe: profileConnectionUpdatedResolver,
    },
  },
  Query: {
    profileConnection: profileConnectionResolver,
  },
  Mutation: {
    sendProfileConnectionRequest: sendProfileConnectionRequestResolver,
    reviewProfileConnectionRequest: reviewProfileConnectionRequestResolver,
    reportOfferStatus: reportOfferStatusResolver,
    archiveProfileConnectionForUser: archiveProfileConnectionForUserResolver,
    unarchiveProfileConnectionForUser:
      unarchiveProfileConnectionForUserResolver,
    deleteProfileConnectionForUser: deleteProfileConnectionForUserResolver,
    updateConnectionLastActionTime: updateConnectionLastActionTimeResolver,
  },
  ProfileConnection: {
    candidateProfile: candidateProfileResolver,
    recruiterProfile: recruiterProfileResolver,
    candidateUser: profileConnectionCandidateUserResolver,
    recruiterUser: profileConnectionRecruiterUserResolver,
    chatMessages: chatMessagesResolver,
    userMeta: profileConnectionUserMetaResolver,
    buddyMeta: profileConnectionBuddyMetaResolver,
    unreadMessagesCount: profileConnectionUnreadMessagesCount,
  },
};
