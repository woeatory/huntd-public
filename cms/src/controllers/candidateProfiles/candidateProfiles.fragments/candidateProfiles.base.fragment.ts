import { gql } from '@apollo/client';

import { HUNTD_USERS_BASE_FRAGMENT } from '@/controllers/huntdUser/huntdUsers.fragments/huntdUsers.base.fragment';

export const CANDIDATE_PROFILES_BASE_FRAGMENT = gql`
  fragment CandidateProfilesBase on CandidateProfiles {
    id
    candidate_description
    experience_description
    position
    status
    salary
    user_id {
      ...HuntdUsersBase
    }
  }
  ${HUNTD_USERS_BASE_FRAGMENT}
`;
