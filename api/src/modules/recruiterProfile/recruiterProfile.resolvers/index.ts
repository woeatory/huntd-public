import { latestRecruiterProfileResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/latestRecruiterProfile.resolver';
import { updateRecruiterProfileResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/updateRecruiterProfile.resolver';
import { activateRecruiterProfileResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/ActivateRecruiterProfile.resolver';
import { publicRecruiterProfilesResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/publicRecruiterProfiles.resolver';
import { recruiterProfileSlugResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/recruiterProfileSlug.resolver';
import { recruiterProfileBySlugResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/recruiterProfileBySlug.resolver';
import { recruiterProfileUserResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/recruiterProfileUser.resolver';
import { deactivateRecruiterProfilesResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/deactivateRecruiterProfiles.resolver';
import { userLastActionTimeResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/userLastActionTime.resolver';
import { recruiterProfileStatusUpdatedResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/recruiterStatusUpdated.resolver';
import { activeProfileConnectionResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/activeConnectionWithCandidate.resolver';
import { reviewRecruiterProfileResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/reviewRecruiterProfile.resolver';
import { bulkSendMessageResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/bulkSendMessage.resolver';
import { bulkReportOfferStatusResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/bulkReportOfferStatus.resolver';
import { createRecruiterProfileResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/createRecruiterProfile.resolver';
import { latestRecruiterProfileByUserIdResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/latestRecruiterProfileByUserId.resolver';
import { updateStatusesNotificationTimeResolver } from '@/modules/recruiterProfile/recruiterProfile.resolvers/updateStatusesNotificationTime.resolver';

export const RecruiterProfileResolvers = {
  Subscription: {
    recruiterProfileStatusUpdated: {
      subscribe: recruiterProfileStatusUpdatedResolver,
    },
  },
  Query: {
    latestRecruiterProfile: latestRecruiterProfileResolver,
    latestRecruiterProfileByUserId: latestRecruiterProfileByUserIdResolver,
    publicRecruiterProfiles: publicRecruiterProfilesResolver,
    recruiterProfileBySlug: recruiterProfileBySlugResolver,
  },
  Mutation: {
    updateStatusesNotificationTime: updateStatusesNotificationTimeResolver,
    createRecruiterProfile: createRecruiterProfileResolver,
    updateRecruiterProfile: updateRecruiterProfileResolver,
    sendRecruiterProfileToReview: activateRecruiterProfileResolver,
    deactivateRecruiterProfiles: deactivateRecruiterProfilesResolver,
    reviewRecruiterProfile: reviewRecruiterProfileResolver,
    bulkSendMessage: bulkSendMessageResolver,
    bulkReportOfferStatus: bulkReportOfferStatusResolver,
  },
  RecruiterProfile: {
    slug: recruiterProfileSlugResolver,
    user: recruiterProfileUserResolver,
    lastActionTime: userLastActionTimeResolver,
    activeConnectionWithCandidate: activeProfileConnectionResolver,
  },
};
