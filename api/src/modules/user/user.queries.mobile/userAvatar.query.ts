import gql from 'graphql-tag';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.mobile/userAvatar.fragment';

export const USER_AVATAR_QUERY = gql`
  query UserAvatar {
    authUser {
      ...UserAvatar
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;
