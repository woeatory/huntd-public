import gql from 'graphql-tag';
import { NFT_BASE_FRAGMENT } from '@/modules/nft/nft.fragments.frontend/nftBase.fragment';

export const CLAIM_NFT_MUTATION = gql`
  mutation claimNft(
    $nftId: Int
  ) {
    claimNft(
      nftId: $nftId
    ) {
    ...NftBase
  }
 }
   ${NFT_BASE_FRAGMENT}
`;
