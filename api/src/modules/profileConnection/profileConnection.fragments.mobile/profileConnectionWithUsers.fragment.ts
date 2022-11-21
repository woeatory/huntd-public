import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.mobile/userAvatar.fragment';

export const PROFILE_CONNECTION_WITH_USERS_FRAGMENT = gql`
  fragment ProfileConnectionWithUsers on ProfileConnection {
    candidateUser {
      ...UserBase
      ...UserAvatar
      isAuthUser
    }
    recruiterUser {
      ...UserBase
      ...UserAvatar
      isAuthUser
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;
