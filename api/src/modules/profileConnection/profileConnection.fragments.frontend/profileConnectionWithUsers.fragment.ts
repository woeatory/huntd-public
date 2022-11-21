import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.frontend/userAvatar.fragment';
import { USER_NFT_FRAGMENT } from '@/modules/user/user.fragments.frontend/userNft.fragment';

export const PROFILE_CONNECTION_WITH_USERS_FRAGMENT = gql`
  fragment ProfileConnectionWithUsers on ProfileConnection {
    candidateUser {
      ...UserBase
      ...UserAvatar
      ...UserNft
      isAuthUser
    }
    recruiterUser {
      ...UserBase
      ...UserAvatar
      ...UserNft
      isAuthUser
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
  ${USER_NFT_FRAGMENT}
`;
