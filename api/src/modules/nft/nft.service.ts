import { ClientError, ClientErrorTypes } from '@mate-academy/core';
import { AuthService } from '@/core/Service';
import { QueueEventTypes } from '@/core/queue';
import { NftRepository } from '@/modules/nft/nft.repository';
import { NftErrors } from '@/modules/nft/nft.constants';

export class NftService extends AuthService {
  private readonly nftRepository = this.makeRepository(
    NftRepository,
  );

  async claimNft(options: {
    nftId: number;
  }) {
    const claimedNft = await this.nftRepository.claimNft({
      userId: this.authUser.id,
      id: options.nftId,
    });

    if (!claimedNft) {
      throw new ClientError({
        message: NftErrors.NotFound,
        type: ClientErrorTypes.NotFound,
      });
    }

    try {
      await this.gateways.queue.add(
        {
          type: QueueEventTypes.SendNftRequestToTrello,
          payload: {
            userEmail: this.authUser.email,
            openSeaLink: claimedNft.openseaUrl,
            receiverWallet: this.authUser.ethWalletAddress,
          },
        },
      );
    } catch (e) {
      this.logger.error(e);
    }

    return claimedNft;
  }
}
