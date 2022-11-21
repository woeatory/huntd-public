import { makeResolver } from '@/core';
import { User } from '@/models/User';
import {
  GetUserAvatarUseCase,
  GetUserAvatarUseCaseOptions,
  GetUserAvatarUseCaseResult,
} from '@/modules/user/user.useCases/GetUserAvatar.useCase';

export const avatarResolver = makeResolver<
  unknown,
  GetUserAvatarUseCaseResult,
  GetUserAvatarUseCaseOptions,
  User
>(
  GetUserAvatarUseCase,
  (_, user) => ({
    userId: user.id,
  }),
);
