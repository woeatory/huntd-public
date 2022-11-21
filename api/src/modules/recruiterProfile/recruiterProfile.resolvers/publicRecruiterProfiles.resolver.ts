import { makeResolver } from '@/core';
import {
  GetPublicRecruiterProfilesUseCase,
  GetPublicRecruiterProfilesUseCaseOptions,
  GetPublicRecruiterProfilesUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetPublicRecruiterProfiles.useCase';

export const publicRecruiterProfilesResolver = makeResolver<
  GetPublicRecruiterProfilesUseCaseOptions,
  GetPublicRecruiterProfilesUseCaseResult
>(
  GetPublicRecruiterProfilesUseCase,
);
