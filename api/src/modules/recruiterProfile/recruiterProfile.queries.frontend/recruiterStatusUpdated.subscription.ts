import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileBase.fragment';

export const RECRUITER_PROFILE_STATUS_UPDATED_SUBSCRIPTION = gql`
  subscription recruiterProfileStatusUpdated {
    recruiterProfileStatusUpdated {
      ...RecruiterProfileBase
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
