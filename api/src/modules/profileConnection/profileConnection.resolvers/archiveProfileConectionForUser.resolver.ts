import { makeAuthResolver } from '@/core';
import {
  ArchiveProfileConnectionForUserUseCase,
  ArchiveProfileConnectionForUserUseCaseOptions,
  ArchiveProfileConnectionForUserUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/ArchiveProfileConnectionForUser.useCase';

export const archiveProfileConnectionForUserResolver = makeAuthResolver<
  ArchiveProfileConnectionForUserUseCaseOptions,
  ArchiveProfileConnectionForUserUseCaseResult
>(
  ArchiveProfileConnectionForUserUseCase,
);
