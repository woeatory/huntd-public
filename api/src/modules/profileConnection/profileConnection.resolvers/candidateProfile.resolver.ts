import { makeAuthResolver } from '@/core';
import {
  GetConnectionCandidateProfileUseCase,
  GetConnectionCandidateProfileUseCaseOptions,
  GetConnectionCandidateProfileUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/GetConnectionCandidateProfile.useCase';
import { ProfileConnection } from '@/models/ProfileConnection';

export const candidateProfileResolver = makeAuthResolver<
  unknown,
  GetConnectionCandidateProfileUseCaseResult,
  GetConnectionCandidateProfileUseCaseOptions,
  ProfileConnection
>(
  GetConnectionCandidateProfileUseCase,
  ((args, profileConnection) => ({
    candidateProfileId: profileConnection.candidateProfileId,
  })),
);
