import { makeAuthResolver } from '@/core';
import {
  RegisterDeviceUseCase,
  RegisterDeviceUseCaseOptions,
  RegisterDeviceUseCaseResult,
} from '@/modules/deviceToken/deviceToken.useCases/RegisterDevice.useCase';

export const registerDeviceResolver = makeAuthResolver<
  RegisterDeviceUseCaseOptions,
  RegisterDeviceUseCaseResult
>(RegisterDeviceUseCase);
