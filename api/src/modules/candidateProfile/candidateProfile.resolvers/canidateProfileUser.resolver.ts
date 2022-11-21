import { makeResolver } from '@/core';
import {
  GetCandidateProfileUserUseCase,
  GetCandidateProfileUserUseCaseOptions,
  GetCandidateProfileUserUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetCandidateProfileUser.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileUserResolver = makeResolver<
  unknown,
  GetCandidateProfileUserUseCaseResult,
  GetCandidateProfileUserUseCaseOptions,
  CandidateProfile
>(
  GetCandidateProfileUserUseCase,
  (args, candidateProfile) => ({
    userId: candidateProfile.userId,
    candidateProfileId: candidateProfile.id,
  }),
);
