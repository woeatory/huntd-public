import { makeAuthResolver } from '@/core';
import {
  GetUserSettingsUseCase,
  GetUserSettingsUseCaseOptions,
  GetUserSettingsUseCaseResult,
} from '@/modules/user/user.useCases/GetUserSettings.useCase';
import { User } from '@/models/User';

export const userSettingsResolver = makeAuthResolver<
  unknown,
  GetUserSettingsUseCaseResult,
  GetUserSettingsUseCaseOptions,
  User
>(
  GetUserSettingsUseCase,
  (args, user) => ({
    userId: user.id,
  }),
);
