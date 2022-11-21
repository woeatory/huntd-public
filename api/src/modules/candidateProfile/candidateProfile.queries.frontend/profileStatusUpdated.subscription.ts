import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';

export const CANDIDATE_PROFILE_STATUS_UPDATED_SUBSCRIPTION = gql`
  subscription candidateProfileStatusUpdated {
    candidateProfileStatusUpdated {
      ...CandidateProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
