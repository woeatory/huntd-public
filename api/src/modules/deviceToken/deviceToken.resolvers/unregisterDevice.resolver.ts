import { makeAuthResolver } from '@/core';
import {
  UnregisterDeviceUseCase,
  UnregisterDeviceUseCaseOptions,
  UnregisterDeviceUseCaseResult,
} from '@/modules/deviceToken/deviceToken.useCases/UnregisterDevice.useCase';

export const unregisterDeviceResolver = makeAuthResolver<
  UnregisterDeviceUseCaseOptions,
  UnregisterDeviceUseCaseResult
>(UnregisterDeviceUseCase);
