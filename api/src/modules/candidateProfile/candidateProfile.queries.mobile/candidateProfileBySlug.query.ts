import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_FULL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileFull.fragment';

export const LATEST_CANDIDATE_PROFILE_QUERY = gql`
  query candidateProfileBySlug($slug: String!) {
    candidateProfileBySlug(slug: $slug) {
      ...CandidateProfileFull
    }
  }
  ${CANDIDATE_PROFILE_FULL_FRAGMENT}
`;
