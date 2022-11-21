import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { Nft } from '@/models/Nft';
import { NftRepository } from '@/modules/nft/nft.repository';

export type GetAllNftsUseCaseOptions = unknown;
export type GetAllNftsUseCaseResult = Nft[];

type Options = GetAllNftsUseCaseOptions;
type Result = GetAllNftsUseCaseResult;

export class GetAllNftsUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  nftRepository = this.makeRepository(
    NftRepository,
  );

  protected async run(): Promise<Result> {
    return this.nftRepository.findAllNfts();
  }
}
