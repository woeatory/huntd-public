import { makeResolver } from '@/core';

import { Vacancy } from '@/models/Vacancy';
import {
  GetVacancyTechnologiesUseCase, GetVacancyTechnologiesUseCaseOptions,
  GetVacancyTechnologiesUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetVacancyTechnologies.useCase';

export const vacancyTechnologiesResolver = makeResolver<
  unknown,
  GetVacancyTechnologiesUseCaseResult,
  GetVacancyTechnologiesUseCaseOptions,
  Vacancy
>(
  GetVacancyTechnologiesUseCase,
  (args, vacancy) => ({
    vacancyId: vacancy.id,
  }),
);
