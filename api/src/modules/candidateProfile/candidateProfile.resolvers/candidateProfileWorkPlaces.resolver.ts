import {
  GetProfileWorkPlacesUseCase,
  GetProfileWorkPlacesUseCaseOptions,
  GetProfileWorkPlacesUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileWorkPlaces.useCase';
import { makeResolver } from '@/core';
import { CandidateProfile } from '@/models/CandidateProfile';

export const candidateProfileWorkPlacesResolver = makeResolver<
  unknown,
  GetProfileWorkPlacesUseCaseResult,
  GetProfileWorkPlacesUseCaseOptions,
  CandidateProfile
>(
  GetProfileWorkPlacesUseCase,
  (args, candidateProfile) => ({
    candidateProfileId: candidateProfile.id,
  }),
);
