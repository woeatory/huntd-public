import { makeAuthResolver } from '@/core';
import {
  ActivateRecruiterProfileUseCase,
  ActivateRecruiterProfileUseCaseOptions,
  ActivateRecruiterProfileUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/ActivateRecruiterProfile.useCase';

export const activateRecruiterProfileResolver = makeAuthResolver<
  ActivateRecruiterProfileUseCaseOptions,
  ActivateRecruiterProfileUseCaseResult
>(
  ActivateRecruiterProfileUseCase,
);
