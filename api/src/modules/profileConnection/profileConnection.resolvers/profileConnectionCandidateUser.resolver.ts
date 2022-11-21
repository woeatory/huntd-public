import { makeAuthResolver } from '@/core';
import {
  GetConnectionCandidateUserUseCase,
  GetConnectionCandidateUserUseCaseOptions,
  GetConnectionCandidateUserUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionCandidateUser.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const profileConnectionCandidateUserResolver = makeAuthResolver<
  unknown,
  GetConnectionCandidateUserUseCaseResult,
  GetConnectionCandidateUserUseCaseOptions,
  ProfileConnection
>(
  GetConnectionCandidateUserUseCase,
  ((args, profileConnection) => ({
    profileConnection,
  })),
);
