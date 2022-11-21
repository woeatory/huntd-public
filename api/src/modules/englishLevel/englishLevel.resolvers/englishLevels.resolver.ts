import {
  GetEnglishLevelsUseCase,
  GetEnglishLevelsUseCaseOptions,
  GetEnglishLevelsUseCaseResult,
} from '@/modules/englishLevel/englishLevel.useCases/GetEnglishLevels.useCase';
import { makeResolver } from '@/core';

export const englishLevelsResolver = makeResolver<
  GetEnglishLevelsUseCaseOptions,
  GetEnglishLevelsUseCaseResult
>(
  GetEnglishLevelsUseCase,
);
