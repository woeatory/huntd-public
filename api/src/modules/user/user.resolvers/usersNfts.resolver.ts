import { makeResolver } from '@/core';
import { User } from '@/models/User';
import {
  GetUsersNftsUseCase, GetUsersNftsUseCaseOptions, GetUsersNftsUseCaseResult,
} from '@/modules/user/user.useCases/GetUsersNfts.useCase';

export const usersNftsResolver = makeResolver<
  unknown,
  GetUsersNftsUseCaseResult,
  GetUsersNftsUseCaseOptions,
  User
>(
  GetUsersNftsUseCase,
  (args, user) => ({
    userId: user.id,
  }),
);
