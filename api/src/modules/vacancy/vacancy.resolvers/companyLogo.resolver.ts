import { makeResolver } from '@/core';
import {
  GetCompanyLogoUseCase, GetCompanyLogoUseCaseOptions,
  GetCompanyLogoUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/GetCompanyLogo.useCase';
import { Vacancy } from '@/models/Vacancy';

export const companyLogoResolver = makeResolver<
  unknown,
  GetCompanyLogoUseCaseResult,
  GetCompanyLogoUseCaseOptions,
  Vacancy
>(
  GetCompanyLogoUseCase,
  (_, vacancy) => ({
    vacancyId: vacancy.id,
  }),
);
