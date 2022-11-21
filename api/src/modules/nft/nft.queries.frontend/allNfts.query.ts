import gql from 'graphql-tag';
import { NFT_BASE_FRAGMENT } from '@/modules/nft/nft.fragments.frontend/nftBase.fragment';

export const ALL_NFTS_QUERY = gql`
  query allNfts {
    allNfts {
      ...NftBase
    }
  }
  ${NFT_BASE_FRAGMENT}
`;
