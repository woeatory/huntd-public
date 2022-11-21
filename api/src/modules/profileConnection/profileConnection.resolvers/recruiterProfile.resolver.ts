import { makeAuthResolver } from '@/core';
import {
  GetConnectionRecruiterProfileUseCase,
  GetConnectionRecruiterProfileUseCaseOptions,
  GetConnectionRecruiterProfileUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionRecruiterProfile.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const recruiterProfileResolver = makeAuthResolver<
  unknown,
  GetConnectionRecruiterProfileUseCaseResult,
  GetConnectionRecruiterProfileUseCaseOptions,
  ProfileConnection
>(
  GetConnectionRecruiterProfileUseCase,
  ((args, profileConnection) => ({
    recruiterProfileId: profileConnection.recruiterProfileId,
  })),
);
