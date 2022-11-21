import { makeResolver } from '@/core';
import {
  GetLatestRecruiterProfileUseCase,
  GetLatestRecruiterProfileUseCaseOptions,
  GetLatestRecruiterProfileUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetLatestRecruiterProfile.useCase';

export const latestRecruiterProfileResolver = makeResolver<
  GetLatestRecruiterProfileUseCaseOptions,
  GetLatestRecruiterProfileUseCaseResult
>(
  GetLatestRecruiterProfileUseCase,
);
