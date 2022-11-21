import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';

export const USER_BY_USERNAME = gql`
  query userByUsername($username: String) {
    userByUsername(username: $username) {
      ...UserBase
    }
  }
  ${USER_BASE_FRAGMENT}
`;
