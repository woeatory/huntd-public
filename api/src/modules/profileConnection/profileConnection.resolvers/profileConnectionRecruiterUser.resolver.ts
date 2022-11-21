import { makeAuthResolver } from '@/core';
import {
  GetConnectionRecruiterUserUseCase,
  GetConnectionRecruiterUserUseCaseOptions,
  GetConnectionRecruiterUserUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionRecruiterUser.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const profileConnectionRecruiterUserResolver = makeAuthResolver<
  unknown,
  GetConnectionRecruiterUserUseCaseResult,
  GetConnectionRecruiterUserUseCaseOptions,
  ProfileConnection
>(
  GetConnectionRecruiterUserUseCase,
  ((args, profileConnection) => ({
    profileConnection,
  })),
);
