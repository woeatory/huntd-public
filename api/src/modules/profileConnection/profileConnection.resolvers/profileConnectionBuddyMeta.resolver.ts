import { makeResolver } from '@/core';
import {
  GetConnectionBuddyMetaUseCase,
  GetConnectionBuddyMetaUseCaseOptions,
  GetConnectionBuddyMetaUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionBuddyMeta.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const profileConnectionBuddyMetaResolver = makeResolver<
  unknown,
  GetConnectionBuddyMetaUseCaseResult,
  GetConnectionBuddyMetaUseCaseOptions,
  ProfileConnection
>(
  GetConnectionBuddyMetaUseCase,
  (args, profileConnection) => ({
    profileConnection,
  }),
);
