import { updateCandidateProfileResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/updateCandidateProfile.resolver';
import { latestCandidateProfileResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/latestCandidateProfile.resolver';
import { sendCandidateProfileToReviewResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/sendCandidateProfileToReview.resolver';
import { reviewCandidateProfileResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/reviewCandidateProfile.resolver';
import { publicCandidateProfilesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/publicCandidateProfiles.resolver';
import { technologiesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/technologies.resolver';
import { englishLevelResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/englishLevel.resolver';
import { jobExperienceResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/jobExperience.resolver';
import { employmentTypesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/employmentTypes.resolver';
import { specializationResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/specialization.resolver';
import { candidateProfileSlugResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfileSlug.resolver';
import { candidateProfileBySlugResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfileBySlug.resolver';
import { candidateProfileUserResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/canidateProfileUser.resolver';
import { candidateProfileCitiesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfileCities.resolver';
import { deactivateCandidateProfilesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/deactivateCandidateProfiles.resolver';
import { employmentLocationsResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/employmentLocations.resolver';
import { userLastActionTimeResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/userLastActionTime.resolver';
import { candidateProfileStatusUpdatedResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/profileStatusUpdated.resolver';
import { candidateProfilesBySubscriptionResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfilesBySubscription.resolver';
import { deactivateUnresponsiveProfilesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/deactivateUnresponsiveProfiles.resolver';
import { latestActiveCandidateProfileResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/latestActiveCandidateProfile.resolver';
import { candidateProfileConnectionsResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfileConnections.resolver';
import { candidateProfileWorkPlacesResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/candidateProfileWorkPlaces.resolver';
import { perfectCandidatesAmountResolver } from '@/modules/candidateProfile/candidateProfile.resolvers/perfectCandidatesAmount.resolver';
import { candidateProfileSpecializationsResolver } from './candidateProfileSpecializations.resolver';

export const CandidateProfileResolvers = {
  Subscription: {
    candidateProfileStatusUpdated: {
      subscribe: candidateProfileStatusUpdatedResolver,
    },
  },
  Query: {
    perfectCandidatesAmount: perfectCandidatesAmountResolver,
    latestActiveCandidateProfile: latestActiveCandidateProfileResolver,
    latestCandidateProfile: latestCandidateProfileResolver,
    publicCandidateProfiles: publicCandidateProfilesResolver,
    candidateProfileBySlug: candidateProfileBySlugResolver,
    candidateProfilesBySubscription: candidateProfilesBySubscriptionResolver,
  },
  Mutation: {
    updateCandidateProfile: updateCandidateProfileResolver,
    sendCandidateProfileToReview: sendCandidateProfileToReviewResolver,
    reviewCandidateProfile: reviewCandidateProfileResolver,
    deactivateCandidateProfiles: deactivateCandidateProfilesResolver,
    deactivateUnresponsiveProfiles: deactivateUnresponsiveProfilesResolver,
  },
  CandidateProfile: {
    technologies: technologiesResolver,
    employmentTypes: employmentTypesResolver,
    employmentLocations: employmentLocationsResolver,
    englishLevel: englishLevelResolver,
    jobExperience: jobExperienceResolver,
    specializations: candidateProfileSpecializationsResolver,
    specialization: specializationResolver,
    slug: candidateProfileSlugResolver,
    user: candidateProfileUserResolver,
    cities: candidateProfileCitiesResolver,
    workPlaces: candidateProfileWorkPlacesResolver,
    lastActionTime: userLastActionTimeResolver,
    connectionsCount: candidateProfileConnectionsResolver,
  },
};
