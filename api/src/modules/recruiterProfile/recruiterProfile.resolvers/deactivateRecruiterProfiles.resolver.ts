import { makeAuthResolver } from '@/core';
import {
  DeactivateRecruiterProfilesUseCase,
  DeactivateRecruiterProfilesUseCaseOptions,
  DeactivateRecruiterProfilesUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/DeactivateRecruiterProfiles.useCase';

export const deactivateRecruiterProfilesResolver = makeAuthResolver<
  DeactivateRecruiterProfilesUseCaseOptions,
  DeactivateRecruiterProfilesUseCaseResult
>(
  DeactivateRecruiterProfilesUseCase,
);
