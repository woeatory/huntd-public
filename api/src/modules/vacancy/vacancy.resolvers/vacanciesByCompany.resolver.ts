import { makeResolver } from '@/core';
import {
  GetVacanciesByCompanyUseCaseResult,
  GetVacanciesByCompanyUseCaseOptions,
  GetVacanciesByCompanyUseCase,
} from '@/modules/vacancy/vacancy.useCases/GetVacanciesByCompany.useCase';

export const vacanciesByCompanyResolver = makeResolver<
  GetVacanciesByCompanyUseCaseOptions,
  GetVacanciesByCompanyUseCaseResult
>(
  GetVacanciesByCompanyUseCase,
);
