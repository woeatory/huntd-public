import {
  GetRecruiterProfileSlugUseCase,
  GetRecruiterProfileSlugUseCaseOptions,
  GetRecruiterProfileSlugUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetRecruiterProfileSlug.useCase';
import { makeResolver } from '@/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export const recruiterProfileSlugResolver = makeResolver<
  unknown,
  GetRecruiterProfileSlugUseCaseResult,
  GetRecruiterProfileSlugUseCaseOptions,
  RecruiterProfile
>(
  GetRecruiterProfileSlugUseCase,
  (args, recruiterProfile) => ({
    recruiterProfile,
  }),
);
