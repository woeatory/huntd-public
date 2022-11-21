import { makeAuthResolver } from '@/core';
import {
  CreateRecruiterProfileUseCase,
  CreateRecruiterProfileUseCaseOptions,
  CreateRecruiterProfileUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/CreateRecruiterProfile.useCase';

export const createRecruiterProfileResolver = makeAuthResolver<
  CreateRecruiterProfileUseCaseOptions,
  CreateRecruiterProfileUseCaseResult
>(
  CreateRecruiterProfileUseCase,
);
