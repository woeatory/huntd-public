import { makeAuthResolver } from '@/core';
import {
  ClaimNftUseCase,
  ClaimNftUseCaseOptions,
  ClaimNftUseCaseResult,
} from '@/modules/nft/nft.useCases/ClaimNft.useCase';

export const claimNftResolver = makeAuthResolver<
  ClaimNftUseCaseOptions,
  ClaimNftUseCaseResult
>(
  ClaimNftUseCase,
);
