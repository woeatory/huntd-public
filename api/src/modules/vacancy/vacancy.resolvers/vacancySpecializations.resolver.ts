import { makeResolver } from '@/core';

import { Vacancy } from '@/models/Vacancy';
import {
  GetVacancySpecializationsUseCase, GetVacancySpecializationsUseCaseOptions,
  GetVacancySpecializationsUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetVacancySpecializations.useCase';

export const vacancySpecializationsResolver = makeResolver<
  unknown,
  GetVacancySpecializationsUseCaseResult,
  GetVacancySpecializationsUseCaseOptions,
  Vacancy
>(
  GetVacancySpecializationsUseCase,
  (args, vacancy) => ({
    vacancyId: vacancy.id,
  }),
);
