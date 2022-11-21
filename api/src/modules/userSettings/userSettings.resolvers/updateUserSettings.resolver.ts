import { makeAuthResolver } from '@/core';
import {
  UpdateUserSettingsUseCase,
  UpdateUserSettingsUseCaseOptions,
  UpdateUserSettingsUseCaseResult,
} from '@/modules/userSettings/userSettings.useCases/UpdateUserSettings.useCase';

export const updateUserSettingsResolver = makeAuthResolver<
  UpdateUserSettingsUseCaseOptions,
  UpdateUserSettingsUseCaseResult
>(UpdateUserSettingsUseCase);
