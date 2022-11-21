import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.api/userBase.fragment';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.api/userCv.fragment';

export const CANDIDATE_PROFILE_USER_FRAGMENT = gql`
  fragment CandidateProfileUser on CandidateProfile {
    user {
      ...UserBase
      ...UserCv
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_CV_FRAGMENT}
`;
