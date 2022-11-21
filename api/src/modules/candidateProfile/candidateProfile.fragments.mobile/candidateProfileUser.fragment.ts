import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.mobile/userBase.fragment';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.mobile/userCv.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.mobile/userAvatar.fragment';

export const CANDIDATE_PROFILE_USER_FRAGMENT = gql`
  fragment CandidateProfileUser on CandidateProfile {
    user {
      ...UserBase
      ...UserCv
      ...UserAvatar
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_CV_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;
