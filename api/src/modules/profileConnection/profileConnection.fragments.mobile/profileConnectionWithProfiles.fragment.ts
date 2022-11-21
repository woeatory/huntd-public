import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileBase.fragment';

export const PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT = gql`
  fragment ProfileConnectionWithProfiles on ProfileConnection {
    candidateProfile {
      ...CandidateProfileBase
    }
    recruiterProfile {
      ...RecruiterProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
