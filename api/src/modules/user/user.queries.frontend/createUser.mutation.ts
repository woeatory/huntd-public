import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!,
    $lastName: String!,
    ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
    ) {
       ...UserBase
    }
  }
   ${USER_BASE_FRAGMENT}
`;
