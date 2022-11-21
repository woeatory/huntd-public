import { makeAuthResolver } from '@/core';
import { GetAllNftsUseCase, GetAllNftsUseCaseOptions, GetAllNftsUseCaseResult } from '@/modules/nft/nft.useCases/GetAllNfts.useCase';

export const allNftsResolver = makeAuthResolver<
  GetAllNftsUseCaseOptions,
  GetAllNftsUseCaseResult
>(
  GetAllNftsUseCase,
);
