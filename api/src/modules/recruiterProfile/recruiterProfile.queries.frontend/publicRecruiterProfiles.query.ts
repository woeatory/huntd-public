import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileBase.fragment';

export const PUBLIC_RECRUITER_PROFILES_QUERY = gql`
  query publicRecruiterProfiles {
    publicRecruiterProfiles {
      ...RecruiterProfileBase
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
