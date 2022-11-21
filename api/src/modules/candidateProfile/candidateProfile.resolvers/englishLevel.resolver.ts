import { makeResolver } from '@/core';
import {
  GetProfileEnglishLevelUseCase,
  GetProfileEnglishLevelUseCaseOptions,
  GetProfileEnglishLevelUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileEnglishLevel.useCase';
import { CandidateProfile } from '@/models/CandidateProfile';

export const englishLevelResolver = makeResolver<
  unknown,
  GetProfileEnglishLevelUseCaseResult,
  GetProfileEnglishLevelUseCaseOptions,
  CandidateProfile
>(
  GetProfileEnglishLevelUseCase,
  (args, candidateProfile) => ({
    englishLevelId: candidateProfile.englishLevelId,
  }),
);
