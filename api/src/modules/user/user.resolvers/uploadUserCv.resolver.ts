import { makeAuthResolver } from '@/core';
import {
  UploadCvUseCase,
  UploadCvUseCaseOptions,
  UploadCvUseCaseResult,
} from '@/modules/user/user.useCases/UploadCv.useCase';

export const uploadUserCvResolver = makeAuthResolver<
  UploadCvUseCaseOptions,
  UploadCvUseCaseResult
  >(
    UploadCvUseCase,
  );
