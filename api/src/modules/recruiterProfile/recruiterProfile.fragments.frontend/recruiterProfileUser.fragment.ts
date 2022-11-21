import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';

export const RECRUITER_PROFILE_USER_FRAGMENT = gql`
  fragment RecruiterProfileUser on RecruiterProfile {
    user {
      ...UserBase
    }
  }
  ${USER_BASE_FRAGMENT}
`;
