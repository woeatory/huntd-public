import { nftEntityResolver } from '@/modules/nft/nft.resolvers/nftEntity.resolver';
import { availableNftsResolver } from '@/modules/nft/nft.resolvers/availableNfts.resolver';
import { claimNftResolver } from '@/modules/nft/nft.resolvers/claimNft.resolver';
import { allNftsResolver } from '@/modules/nft/nft.resolvers/allNfts.resolver';

export const NftResolvers = {
  Query: {
    allNfts: allNftsResolver,
    availableNfts: availableNftsResolver,
  },

  Mutation: {
    claimNft: claimNftResolver,
  },

  Nft: {
    entity: nftEntityResolver,
  },
};
