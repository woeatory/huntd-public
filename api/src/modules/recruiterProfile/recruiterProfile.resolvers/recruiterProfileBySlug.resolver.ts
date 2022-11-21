import { makeResolver } from '@/core';
import {
  GetRecruiterProfileBySlugUseCase,
  GetRecruiterProfileBySlugUseCaseOptions,
  GetRecruiterProfileBySlugUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetRecruiterProfileBySlug.useCase';

export const recruiterProfileBySlugResolver = makeResolver<
  GetRecruiterProfileBySlugUseCaseOptions,
  GetRecruiterProfileBySlugUseCaseResult
>(
  GetRecruiterProfileBySlugUseCase,
);
