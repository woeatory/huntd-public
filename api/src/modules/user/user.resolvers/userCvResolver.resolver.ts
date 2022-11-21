import { makeResolver } from '@/core';
import {
  GetUserUploadedCvUseCase,
  GetUserUploadedCvUseCaseOptions,
  GetUserUploadedCvUseCaseResult,
} from '@/modules/user/user.useCases/GetUserUploadedCv.useCase';
import { User } from '@/models/User';

export const userCvResolver = makeResolver<
  unknown,
  GetUserUploadedCvUseCaseResult,
  GetUserUploadedCvUseCaseOptions,
  User
>(
  GetUserUploadedCvUseCase,
  (_, user) => ({
    userId: user.id,
  }),
);
