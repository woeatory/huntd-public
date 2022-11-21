import gql from 'graphql-tag';
import { RECRUITER_PROFILE_FULL_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.mobile/recruiterProfileFull.fragment';

export const LATEST_RECRUITER_PROFILE_QUERY = gql`
  query latestRecruiterProfile {
    latestRecruiterProfile {
      ...RecruiterProfileFull
    }
  }
  ${RECRUITER_PROFILE_FULL_FRAGMENT}
`;
