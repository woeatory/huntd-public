import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { Nft } from '@/models/Nft';
import { NftRepository } from '@/modules/nft/nft.repository';

export type GetAvailableNftsUseCaseOptions = unknown;
export type GetAvailableNftsUseCaseResult = Nft[];

type Options = GetAvailableNftsUseCaseOptions;
type Result = GetAvailableNftsUseCaseResult;

export class GetAvailableNftsUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  nftRepository = this.makeRepository(
    NftRepository,
  );

  protected async run(): Promise<Result> {
    return this.nftRepository.findAvailableNfts();
  }
}
