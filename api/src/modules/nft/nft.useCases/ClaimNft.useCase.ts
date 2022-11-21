import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { Nft } from '@/models/Nft';
import { NftService } from '@/modules/nft/nft.service';

export interface ClaimNftUseCaseOptions {
  nftId: number,
}

export type ClaimNftUseCaseResult = Nft | Error;

type Options = ClaimNftUseCaseOptions;
type Result = ClaimNftUseCaseResult;

export class ClaimNftUseCase extends AuthUseCase<Options, Result> {
  private readonly nftService = this.makeService(
    NftService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      nftId: ['required', 'positive_integer'],
    };
  }

  protected async run({ nftId }: Options): Promise<Result> {
    return this.nftService.claimNft({ nftId });
  }
}
