import gql from 'graphql-tag';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.mobile/userEngagementFields.fragment';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.mobile/userCv.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.mobile/userAvatar.fragment';
import { USER_SOCIAL_LINKS_FRAGMENT } from '@/modules/user/user.fragments.mobile/userSocialLinks.fragment';
import { IS_FIRST_CANDIDATE_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.mobile/isFirstTimeFillingCandidateProfile.fragment';

export const AUTH_USER_QUERY = gql`
  query authUser {
    authUser {
      ...UserBase
      ...UserPrimaryProfile
      ...UserEngagementFields
      ...UserCv
      ...UserAvatar
      ...UserSocialLinks
      ...IsFirstCandidateProfile
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
  ${USER_CV_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
  ${USER_ENGAGEMENT_FIELDS_FRAGMENT}
  ${USER_SOCIAL_LINKS_FRAGMENT}
  ${IS_FIRST_CANDIDATE_PROFILE_FRAGMENT}
`;
