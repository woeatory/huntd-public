import { makeResolver } from '@/core';
import {
  GetProfileEnglishLevelUseCase,
  GetProfileEnglishLevelUseCaseOptions,
  GetProfileEnglishLevelUseCaseResult,
} from '@/modules/candidateProfile/candidateProfile.useCases/GetProfileEnglishLevel.useCase';
import { Vacancy } from '@/models/Vacancy';

export const vacancyEnglishLevelResolver = makeResolver<
  unknown,
  GetProfileEnglishLevelUseCaseResult,
  GetProfileEnglishLevelUseCaseOptions,
  Vacancy
>(
  GetProfileEnglishLevelUseCase,
  (args, vacancy) => ({
    englishLevelId: vacancy.englishLevelId,
  }),
);
