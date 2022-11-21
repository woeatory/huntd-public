import { makeResolver } from '@/core';
import {
  GetProfileEmploymentLocationsUseCase,
  GetProfileEmploymentLocationsUseCaseOptions,
  GetProfileEmploymentLocationsUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileEmploymentLocations.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const employmentLocationsResolver = makeResolver<
  unknown,
  GetProfileEmploymentLocationsUseCaseResult,
  GetProfileEmploymentLocationsUseCaseOptions,
  CandidateProfile
>(
  GetProfileEmploymentLocationsUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
