import { subscribeToCandidatesSearchResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/subscribeToCandidatesSearch.resolver';
import { unsubscribeFromCandidatesSearchResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/unsubscribeFromCandidatesSearch.resolver';
import { updateSubscriptionLastUsedResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/updateSubscriptionLastUsed.resolver';
import { stringifiedSearchParamsResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/stringifiedSearchParams.resolver';
import { stringifiedSubscriptionTechnologiesResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/stringifiedSubscriptionTechnologies.resolver';
import { stringifiedSubscriptionEnglishLevelsResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/stringifiedSubscriptionEnglishLevels.resolver';
import { stringifiedSubscriptionEmploymentTypesResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/stringifiedSubscriptionEmploymentTypes.resolver';
import { stringifiedSubscriptionJobExperiencesResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/stringifiedSubscriptionJobExperiences.resolver';
import { usersSearchSubscriptionsResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/usersSearchSubscriptions.resolver';
import { updateSubscriptionLastNotifiedResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/updateSubscriptionLastNotified.resolver';
import { updateSubscriptionTitleResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/updateSubscriptionTitle.resolver';
import { usersSearchSubscriptionsByUserIdResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/usersSearchSubscriptionsByUserId.resolver';
import { subscriptionUrlResolver } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers/subscriptionUrl.resolver';

export const UsersSearchSubscriptionResolvers = {
  Query: {
    usersSearchSubscriptions: usersSearchSubscriptionsResolver,
    userSearchSubscriptionsByUserId: usersSearchSubscriptionsByUserIdResolver,
  },
  Mutation: {
    subscribeToCandidatesSearch: subscribeToCandidatesSearchResolver,
    unsubscribeFromCandidatesSearch: unsubscribeFromCandidatesSearchResolver,
    updateSubscriptionLastUsed: updateSubscriptionLastUsedResolver,
    updateSubscriptionLastNotified: updateSubscriptionLastNotifiedResolver,
    updateSubscriptionTitle: updateSubscriptionTitleResolver,
  },
  UsersSearchSubscription: {
    stringifiedSearchParams: stringifiedSearchParamsResolver,
    subscriptionUrl: subscriptionUrlResolver,
  },
  SubscriptionStringifiedParams: {
    technologies: stringifiedSubscriptionTechnologiesResolver,
    englishLevels: stringifiedSubscriptionEnglishLevelsResolver,
    employmentTypes: stringifiedSubscriptionEmploymentTypesResolver,
    jobExperiences: stringifiedSubscriptionJobExperiencesResolver,
  },
};
