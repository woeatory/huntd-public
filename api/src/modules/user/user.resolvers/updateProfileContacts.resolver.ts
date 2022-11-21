import { makeAuthResolver } from '@/core';
import {
  UpdateProfileContactsUseCase,
  UpdateProfileContactsUseCaseOptions,
  UpdateProfileContactsUseCaseResult,
} from '@/modules/user/user.useCases/UpdateProfileContacts.useCase';

export const updateProfileContactsResolver = makeAuthResolver<
  UpdateProfileContactsUseCaseOptions,
  UpdateProfileContactsUseCaseResult
>(
  UpdateProfileContactsUseCase,
);
