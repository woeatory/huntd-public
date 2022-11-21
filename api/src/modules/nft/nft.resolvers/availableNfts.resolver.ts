import { makeAuthResolver } from '@/core';
import {
  GetAvailableNftsUseCase,
  GetAvailableNftsUseCaseOptions,
  GetAvailableNftsUseCaseResult,
} from '@/modules/nft/nft.useCases/GetAvailableNfts.useCase';

export const availableNftsResolver = makeAuthResolver<
  GetAvailableNftsUseCaseOptions,
  GetAvailableNftsUseCaseResult
>(
  GetAvailableNftsUseCase,
);
