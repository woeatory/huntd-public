import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.frontend/userEngagementFields.fragment';

export const SOCIAL_SIGN_UP_MUTATION = gql`
  mutation socialSignUp(
    $email: String!,
    $phone: String,
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
    $providerId: String!,
    $providerName: String!,
    $token: String,
  ) {
    socialSignUp(
      email: $email,
      phone: $phone,
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
      providerId: $providerId,
      providerName: $providerName,
      token: $token,
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
