import { makeAuthResolver } from '@/core';
import {
  UploadAvatarUseCase,
  UploadAvatarUseCaseOptions,
  UploadAvatarUseCaseResult,
} from '@/modules/user/user.useCases/UploadAvatar.useCase';

export const uploadAvatarResolver = makeAuthResolver<
  UploadAvatarUseCaseOptions,
  UploadAvatarUseCaseResult
>(
  UploadAvatarUseCase,
);
