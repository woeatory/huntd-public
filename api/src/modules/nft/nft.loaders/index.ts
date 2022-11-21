import { Models } from '@/models';
import { NftByUserIdLoader } from '@/modules/nft/nft.loaders/NftByUserId.loader';

export const initNftLoaders = (models: Models) => ({
  nftByUserId: new NftByUserIdLoader(models),
});
