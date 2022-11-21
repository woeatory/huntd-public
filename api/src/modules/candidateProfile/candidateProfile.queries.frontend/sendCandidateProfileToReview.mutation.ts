import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';

export const SEND_CANDIDATE_PROFILE_TO_REVIEW_MUTATION = gql`
  mutation sendCandidateProfileToReview {
    sendCandidateProfileToReview {
      ...CandidateProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
