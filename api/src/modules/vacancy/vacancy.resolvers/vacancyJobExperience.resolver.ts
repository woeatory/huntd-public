import { makeResolver } from '@/core';
import { Vacancy } from '@/models/Vacancy';
import {
  GetVacancyJobExperienceUseCase,
  GetVacancyJobExperienceUseCaseOptions,
  GetVacancyJobExperienceUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetVacancyJobExperience.useCase';

export const vacancyJobExperienceResolver = makeResolver<
  unknown,
  GetVacancyJobExperienceUseCaseResult,
  GetVacancyJobExperienceUseCaseOptions,
  Vacancy
>(
  GetVacancyJobExperienceUseCase,
  (args, vacancy) => ({
    jobExperienceId: vacancy.jobExperienceId,
  }),
);
