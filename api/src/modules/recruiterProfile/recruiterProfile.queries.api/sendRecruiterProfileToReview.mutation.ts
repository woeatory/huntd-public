import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.api/recruiterProfileBase.fragment';

export const SEND_RECRUITER_PROFILE_TO_REVIEW_MUTATION = gql`
  mutation sendRecruiterProfileToReview {
    sendRecruiterProfileToReview {
      ...RecruiterProfileBase
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
