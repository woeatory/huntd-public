import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';

export const CANDIDATE_PROFILES_BY_SUBSCRIPTION_QUERY = gql`
  query candidateProfilesBySubscription($subscriptionLastInteract: GraphQLDateTime!, $where: PublicProfilesParameters!) {
    candidateProfilesBySubscription(subscriptionLastInteract: $subscriptionLastInteract, where: $where) {
      ...CandidateProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
