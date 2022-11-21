import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';

export const SERVICE_USER_QUERY = gql`
  query serviceUser {
    serviceUser {
      ...UserBase
    }
  }
  ${USER_BASE_FRAGMENT}
`;
