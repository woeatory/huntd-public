import { makeResolver } from '@/core';
import {
  AddVacanciesLogoUseCase,
  AddVacanciesLogoUseCaseOptions,
  AddVacanciesLogoUseCaseResult,
} from '@/modules/vacancy/vacancy.useCases/AddVacanciesLogo.useCase';

export const addVacanciesLogoResolver = makeResolver<
AddVacanciesLogoUseCaseOptions,
AddVacanciesLogoUseCaseResult
>(
  AddVacanciesLogoUseCase,
);
