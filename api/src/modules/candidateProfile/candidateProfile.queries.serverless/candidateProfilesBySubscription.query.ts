import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_FULL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfile.full.fragment';

export const CANDIDATE_PROFILES_BY_SUBSCRIPTION_QUERY = gql`
  query candidateProfilesBySubscription($subscriptionLastInteract: GraphQLDateTime!, $where: PublicProfilesParameters!) {
    candidateProfilesBySubscription(subscriptionLastInteract: $subscriptionLastInteract, where: $where) {
      ...CandidateProfileFull
    }
  }
  ${CANDIDATE_PROFILE_FULL_FRAGMENT}
`;
