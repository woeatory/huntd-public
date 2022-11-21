import gql from 'graphql-tag';
import { USER_PRIMARY_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userPrimaryProfile.fragment';
import { USER_ENGAGEMENT_FIELDS_FRAGMENT } from '@/modules/user/user.fragments.frontend/userEngagementFields.fragment';
import { IS_FIRST_CANDIDATE_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.frontend/isFirstTimeFillingCandidateProfile.fragment';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.api/userBase.fragment';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.api/userCv.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.frontend/userAvatar.fragment';
import { USER_SOCIAL_LINKS_FRAGMENT } from '@/modules/user/user.fragments.frontend/userSocialLinks.fragment';
import { USER_HAS_VACANCIES_SOURCE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userVacanciesSource.fragment';
import { IS_FIRST_RECRUITER_PROFILE_FRAGMENT } from '@/modules/user/user.fragments.frontend/isFirstTimeFillingRecruiterProfile.fragment';
import { USER_NFT_FRAGMENT } from '@/modules/user/user.fragments.frontend/userNft.fragment';

export const AUTH_USER_QUERY = gql`
  query authUser {
    authUser {
      ...UserBase
      ...UserPrimaryProfile
      ...UserEngagementFields
      ...UserCv
      ...UserAvatar
      ...IsFirstCandidateProfile
      ...IsFirstRecruiterProfile
      ...UserSocialLinks
      ...UserHasVacanciesSource
      ...UserNft
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_PRIMARY_PROFILE_FRAGMENT}
  ${USER_CV_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
  ${USER_ENGAGEMENT_FIELDS_FRAGMENT}
  ${IS_FIRST_CANDIDATE_PROFILE_FRAGMENT}
  ${IS_FIRST_RECRUITER_PROFILE_FRAGMENT}
  ${USER_SOCIAL_LINKS_FRAGMENT}
  ${USER_HAS_VACANCIES_SOURCE_FRAGMENT}
  ${USER_NFT_FRAGMENT}
`;
