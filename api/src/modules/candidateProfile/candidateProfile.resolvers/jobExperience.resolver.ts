import { makeResolver } from '@/core';
import {
  GetProfileJobExperienceUseCase,
  GetProfileJobExperienceUseCaseOptions,
  GetProfileJobExperienceUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileJobExperience.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const jobExperienceResolver = makeResolver<
  unknown,
  GetProfileJobExperienceUseCaseResult,
  GetProfileJobExperienceUseCaseOptions,
  CandidateProfile
>(
  GetProfileJobExperienceUseCase,
  (args, candidateProfile) => ({
    jobExperienceId: candidateProfile.jobExperienceId,
  }),
);
