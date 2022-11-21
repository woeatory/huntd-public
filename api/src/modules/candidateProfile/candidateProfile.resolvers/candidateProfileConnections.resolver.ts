import { makeResolver } from '@/core/makeResolver/makeResolver';
import {
  GetCandidateProfileConnectionsUseCase,
  GetCandidateProfileConnectionsUseCaseOptions,
  GetCandidateProfileConnectionsUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetCandidateProfileConnections.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileConnectionsResolver = makeResolver<
  unknown,
  GetCandidateProfileConnectionsUseCaseResult,
  GetCandidateProfileConnectionsUseCaseOptions,
  CandidateProfile
>(
  GetCandidateProfileConnectionsUseCase,
  (args, candidateProfile) => ({
    candidateUserId: candidateProfile.userId,
  }),
);
