import { makeResolver } from '@/core';
import {
  GetConnectionUserMetaUseCase,
  GetConnectionUserMetaUseCaseOptions,
  GetConnectionUserMetaUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionUserMeta.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const profileConnectionUserMetaResolver = makeResolver<
  unknown,
  GetConnectionUserMetaUseCaseResult,
  GetConnectionUserMetaUseCaseOptions,
  ProfileConnection
>(
  GetConnectionUserMetaUseCase,
  (args, profileConnection) => ({
    profileConnectionId: profileConnection.id,
  }),
);
