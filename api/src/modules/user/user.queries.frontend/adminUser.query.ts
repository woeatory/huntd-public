import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';

export const ADMIN_USER_QUERY = gql`
  query adminUser {
    adminUser {
      ...UserBase
    }
  }
  ${USER_BASE_FRAGMENT}
`;
