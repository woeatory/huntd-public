import { makeResolver } from '@/core';
import {
  GetProfileEmploymentTypesUseCase,
  GetProfileEmploymentTypesUseCaseOptions,
  GetProfileEmploymentTypesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileEmploymentTypes.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const employmentTypesResolver = makeResolver<
  unknown,
  GetProfileEmploymentTypesUseCaseResult,
  GetProfileEmploymentTypesUseCaseOptions,
  CandidateProfile
>(
  GetProfileEmploymentTypesUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
