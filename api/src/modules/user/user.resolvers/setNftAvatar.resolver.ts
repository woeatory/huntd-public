import { makeAuthResolver } from '@/core';
import {
  SetNftAvatarUseCase,
  SetNftAvatarUseCaseOptions,
  SetNftAvatarUseCaseResult,
} from '@/modules/user/user.useCases/SetNftAvatar.useCase';

export const setNftAvatarResolver = makeAuthResolver<
  SetNftAvatarUseCaseOptions,
  SetNftAvatarUseCaseResult
>(
  SetNftAvatarUseCase,
);
