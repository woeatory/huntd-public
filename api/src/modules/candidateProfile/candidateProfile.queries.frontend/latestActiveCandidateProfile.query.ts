import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';

export const LATEST_ACTIVE_CANDIDATE_PROFILE_QUERY = gql`
  query latestActiveCandidateProfile($userId: Int!) {
    latestActiveCandidateProfile(
      userId: $userId
    ) {
      ...CandidateProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
