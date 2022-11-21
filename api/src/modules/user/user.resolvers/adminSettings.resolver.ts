import { makeAuthResolver } from '@/core';
import {
  GetAdminSettingsUseCase,
  GetAdminSettingsUseCaseOptions,
  GetAdminSettingsUseCaseResult,
} from '@/modules/user/user.useCases/GetAdminSettings.useCase';

export const adminSettingsResolver = makeAuthResolver<
  GetAdminSettingsUseCaseOptions,
  GetAdminSettingsUseCaseResult
>(
  GetAdminSettingsUseCase,
);
