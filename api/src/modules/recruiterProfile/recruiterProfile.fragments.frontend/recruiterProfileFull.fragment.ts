import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileBase.fragment';
import { RECRUITER_PROFILE_USER_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileUser.fragment';

export const RECRUITER_PROFILE_FULL_FRAGMENT = gql`
  fragment RecruiterProfileFull on RecruiterProfile {
    ...RecruiterProfileBase
    ...RecruiterProfileUser
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
  ${RECRUITER_PROFILE_USER_FRAGMENT}
`;
