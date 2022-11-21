import { makeAuthResolver } from '@/core';
import {
  RemoveСvUseCaseOptions,
  RemoveСvUseCaseResult,
  RemoveСvUseCase,
} from '@/modules/user/user.useCases/RemoveCv.useCase';

export const removeUserCvResolver = makeAuthResolver<
  RemoveСvUseCaseOptions,
  RemoveСvUseCaseResult
  >(
    RemoveСvUseCase,
  );
