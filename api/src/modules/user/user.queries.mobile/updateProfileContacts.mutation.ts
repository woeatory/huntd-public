import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userPrimaryProfile.fragment';

export const UPDATE_PROFILE_CONTACTS_MUTATION = gql`
  mutation updateProfileContacts(
    $phone: String
    $firstName: String!
    $lastName: String!
    $linkedinUrl: String
    $behanceUrl: String
    $githubUrl: String
  ) {
    updateProfileContacts(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      linkedinUrl: $linkedinUrl
      behanceUrl: $behanceUrl
      githubUrl: $githubUrl
    ) {
      ...UserBase
      ...UserPrimaryProfile
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
`;
