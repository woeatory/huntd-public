import {
  GetRecruiterProfileUserUseCase,
  GetRecruiterProfileUserUseCaseOptions, GetRecruiterProfileUserUseCaseResult,
} from '@/modules/recruiterProfile/recruiterProfile.useCases/GetRecruiterProfileUser.useCase';
import { makeResolver } from '@/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export const recruiterProfileUserResolver = makeResolver<
  unknown,
  GetRecruiterProfileUserUseCaseResult,
  GetRecruiterProfileUserUseCaseOptions,
  RecruiterProfile
>(
  GetRecruiterProfileUserUseCase,
  (args, recruiterProfile) => ({
    userId: recruiterProfile.userId,
    recruiterProfileId: recruiterProfile.id,
  }),
);
