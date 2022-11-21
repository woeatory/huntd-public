import { makeAuthResolver } from '@/core';
import {
  GetActiveProfileConnectionUseCase,
  GetActiveProfileConnectionUseCaseOptions,
  GetActiveProfileConnectionUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetActiveProfileConnection.useCase';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export const activeProfileConnectionResolver = makeAuthResolver<
  { candidateProfileId: number },
  GetActiveProfileConnectionUseCaseResult,
  GetActiveProfileConnectionUseCaseOptions,
  RecruiterProfile
  >(
    GetActiveProfileConnectionUseCase,
    (args, recruiterProfile) => ({
      recruiterProfileId: recruiterProfile.id,
      candidateProfileId: args.candidateProfileId,
    }),
  );
