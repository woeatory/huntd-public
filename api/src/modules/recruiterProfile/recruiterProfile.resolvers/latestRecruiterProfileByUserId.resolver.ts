import { makeResolver } from '@/core';
import {
  GetLatestRecruiterProfileByUserIdUseCase,
  GetLatestRecruiterProfileByUserIdUseCaseOptions,
  GetLatestRecruiterProfileByUserIdUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetLatestRecruiterProfileByUserId.useCase';

export const latestRecruiterProfileByUserIdResolver = makeResolver<
  GetLatestRecruiterProfileByUserIdUseCaseOptions,
  GetLatestRecruiterProfileByUserIdUseCaseResult
>(
  GetLatestRecruiterProfileByUserIdUseCase,
);
