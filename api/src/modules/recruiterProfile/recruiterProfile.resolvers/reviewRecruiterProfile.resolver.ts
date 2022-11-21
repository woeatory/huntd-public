import {
  ReviewRecruiterProfileUseCase,
  ReviewRecruiterProfileUseCaseOptions,
  ReviewRecruiterProfileUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/ReviewRecruiterProfile.useCase';
import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';

export const reviewRecruiterProfileResolver = makeServiceResolver<
  ReviewRecruiterProfileUseCaseOptions,
  ReviewRecruiterProfileUseCaseResult
  >(
    ReviewRecruiterProfileUseCase,
  );
