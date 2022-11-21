import { makeResolver } from '@/core';
import {
  GetNftEntityUseCase, GetNftEntityUseCaseOptions,
  GetNftEntityUseCaseResult,
} from '@/modules/nft/nft.useCases/GetNftEntity.useCase';
import { Nft } from '@/models/Nft';

export const nftEntityResolver = makeResolver<
  unknown,
  GetNftEntityUseCaseResult,
  GetNftEntityUseCaseOptions,
  Nft
>(
  GetNftEntityUseCase,
  (_, nft) => ({
    nftId: nft.id,
  }),
);
