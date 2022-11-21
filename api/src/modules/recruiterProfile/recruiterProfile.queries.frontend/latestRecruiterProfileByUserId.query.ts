import gql from 'graphql-tag';
import { RECRUITER_PROFILE_FULL_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileFull.fragment';

export const LATEST_RECRUITER_PROFILE_BY_USER_ID_QUERY = gql`
  query latestRecruiterProfileByUserId($userId: Int) {
    latestRecruiterProfileByUserId(userId: $userId) {
      ...RecruiterProfileFull
    }
  }
  ${RECRUITER_PROFILE_FULL_FRAGMENT}
`;
