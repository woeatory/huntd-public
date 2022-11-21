import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.mobile/userAvatar.fragment';

export const RECRUITER_PROFILE_USER_FRAGMENT = gql`
  fragment RecruiterProfileUser on RecruiterProfile {
    user {
      ...UserBase
      ...UserAvatar
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;
