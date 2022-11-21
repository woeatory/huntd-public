import { User } from '@/models/User';
import { makeResolver } from '@/core';
import {
  GetPrimaryProfileUseCase, GetPrimaryProfileUseCaseOptions,
  GetPrimaryProfileUseCaseResult,
} from '@/modules/user/user.useCases/GetPrimaryProfile.useCase';

export const primaryProfileResolver = makeResolver<
  unknown,
  GetPrimaryProfileUseCaseResult,
  GetPrimaryProfileUseCaseOptions,
  User
>(
  GetPrimaryProfileUseCase,
  (_, user) => ({ userId: user.id }),
);
