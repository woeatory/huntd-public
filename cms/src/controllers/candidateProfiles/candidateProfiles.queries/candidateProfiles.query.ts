import { gql } from '@apollo/client';

import { CANDIDATE_PROFILES_BASE_FRAGMENT } from '@/controllers/candidateProfiles/candidateProfiles.fragments/candidateProfiles.base.fragment';

export const CANDIDATE_PROFILES_QUERY = gql`
  query candidateProfiles($sort: String, $limit: Int, $start: Int, $where: JSON) {
    candidateProfiles(sort: $sort, limit: $limit, start: $start, where: $where) {
      ...CandidateProfilesBase
    }
  }
  ${CANDIDATE_PROFILES_BASE_FRAGMENT}
`;
