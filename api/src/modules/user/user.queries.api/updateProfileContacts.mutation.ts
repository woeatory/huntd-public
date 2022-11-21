import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.api/userBase.fragment';

export const UPDATE_PROFILE_CONTACTS_MUTATION = gql`
  mutation updateProfileContacts(
    $phone: String
    $firstName: String!
    $lastName: String!
  ) {
    updateProfileContacts(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
    ) {
      ...UserBase
      ...UserPrimaryProfile
    }
  }
  ${USER_BASE_FRAGMENT}
`;
