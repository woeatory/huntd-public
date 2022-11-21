import { makeAuthResolver } from '@/core';
import {
  UpdateRecruiterProfileUseCase,
  UpdateRecruiterProfileUseCaseOptions,
  UpdateRecruiterProfileUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/UpdateRecruiterProfile.useCase';

export const updateRecruiterProfileResolver = makeAuthResolver<
  UpdateRecruiterProfileUseCaseOptions,
  UpdateRecruiterProfileUseCaseResult
>(
  UpdateRecruiterProfileUseCase,
);
