import {
  GetProfileCitiesUseCase,
  GetProfileCitiesUseCaseOptions,
  GetProfileCitiesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileCities.useCase';
import { makeResolver } from '@/core';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileCitiesResolver = makeResolver<
  unknown,
  GetProfileCitiesUseCaseResult,
  GetProfileCitiesUseCaseOptions,
  CandidateProfile
>(
  GetProfileCitiesUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
