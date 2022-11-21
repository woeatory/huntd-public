import { Repository } from '@/core/Repository';
import { Nft } from '@/models/Nft';
import { NftErrors } from './nft.constants';

interface ClaimNftOptions {
  userId: number,
  id: number,
}

export class NftRepository extends Repository {
  async findAllNfts(): Promise<Nft[]> {
    return this.models.Nft.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
  }

  async findAvailableNfts(): Promise<Nft[]> {
    return this.models.Nft.findAll({
      where: {
        userId: null,
      },
      order: [
        ['id', 'DESC'],
      ],
    });
  }

  async claimNft({ userId, id }: ClaimNftOptions): Promise<Nft> {
    const [count, updatedRows] = await this.models.Nft.update(
      {
        userId,
      },
      {
        where: {
          id,
          userId: null,
        },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(NftErrors.NotFound);
    }

    return updatedRows[0].get({ plain: true }) as Nft;
  }
}
