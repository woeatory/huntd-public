import gql from 'graphql-tag';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.mobile/userEngagementFields.fragment';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ...UserBase
      ...UserPrimaryProfile
      ...UserEngagementFields
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
  ${USER_ENGAGEMENT_FIELDS_FRAGMENT}
`;
