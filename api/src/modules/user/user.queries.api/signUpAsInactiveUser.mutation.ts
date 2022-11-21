import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.api/userBase.fragment';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.api/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.api/userEngagementFields.fragment';

export const SIGN_UP_AS_INACTIVE_USER_MUTATION = gql`
  mutation signUpAsInactiveUser(
    $username: String!,
    $email: String!,
    $phone: String,
    $password: String!,
    $repeatPassword: String!,
    $firstName: String,
    $lastName: String,
    $fvType: String,
    $fvSource: String,
    $fvMedium: String,
    $fvCampaign: String,
    $fvContent: String,
    $fvTerm: String,
    $lvType: String,
    $lvSource: String,
    $lvMedium: String,
    $lvCampaign: String,
    $lvContent: String,
    $lvTerm: String,
    $gClientid: String,
    $gIp: String,
    $gAgent: String,
    $gclid: String,
  ) {
    signUpAsInactiveUser(
      username: $username,
      email: $email,
      phone: $phone,
      password: $password,
      repeatPassword: $repeatPassword,
      firstName: $firstName,
      lastName: $lastName,
      fvType: $fvType,
      fvSource: $fvSource,
      fvMedium: $fvMedium,
      fvCampaign: $fvCampaign,
      fvContent: $fvContent,
      fvTerm: $fvTerm,
      lvType: $lvType,
      lvSource: $lvSource,
      lvMedium: $lvMedium,
      lvCampaign: $lvCampaign,
      lvContent: $lvContent,
      lvTerm: $lvTerm,
      gClientid: $gClientid,
      gIp: $gIp,
      gAgent: $gAgent,
      gclid: $gclid,
    ) {
      ...UserBase
      ...UserPrimaryProfile
      ...UserEngagementFields
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
  ${USER_ENGAGEMENT_FIELDS_FRAGMENT}
`;
