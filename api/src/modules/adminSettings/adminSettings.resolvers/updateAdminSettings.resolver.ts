import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { idX } from '@mate-academy/core';
import { makeAuthResolver } from '@/core';
import {
  UpdateAdminSettingsUseCase,
  UpdateAdminSettingsUseCaseOptions,
  UpdateAdminSettingsUseCaseResult,
} from '@/modules/adminSettings/adminSettings.useCases/UpdateAdminSettings.useCase';

export const updateAdminSettingsResolver = makeAuthResolver<
  UpdateAdminSettingsUseCaseOptions,
  UpdateAdminSettingsUseCaseResult
>(
  UpdateAdminSettingsUseCase,
  idX,
  [
    (parent, args, ctx) => {
      if (ctx?.authUser?.isAdminUser) {
        return skip;
      }

      throw new ForbiddenError('forbidden');
    },
  ],
);
