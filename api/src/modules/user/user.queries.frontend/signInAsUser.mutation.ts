import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.frontend/userEngagementFields.fragment';

export const SIGN_IN_AS_USER_MUTATION = gql`
  mutation signInAsUser($email: String!) {
    signInAsUser(email: $email) {
      ...UserBase
      ...UserPrimaryProfile
      ...UserEngagementFields
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
  ${USER_ENGAGEMENT_FIELDS_FRAGMENT}
`;
