import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.frontend/userCv.fragment';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.frontend/userAvatar.fragment';
import { NFT_BASE_FRAGMENT } from '@/modules/nft/nft.fragments.frontend/nftBase.fragment';

export const CANDIDATE_PROFILE_USER_FRAGMENT = gql`
  fragment CandidateProfileUser on CandidateProfile {
    user {
      ...UserBase
      ...UserCv
      ...UserAvatar
      nfts {
        ...NftBase
      }
    }
  }
  ${USER_BASE_FRAGMENT}
  ${USER_CV_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
  ${NFT_BASE_FRAGMENT}

`;
