import gql from 'graphql-tag';
import { NFT_BASE_FRAGMENT } from '@/modules/nft/nft.fragments.frontend/nftBase.fragment';

export const CANDIDATE_PROFILE_USER_WITH_NFT_FRAGMENT = gql`
  fragment CandidateProfileUserWithNft on CandidateProfile {
    user {
      id
      nfts {
        ...NftBase
      }
    }
  }
  ${NFT_BASE_FRAGMENT}
`;
