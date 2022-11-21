import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import { DeleteObsoleteSourcedVacanciesUseCase, DeleteObsoleteSourcedVacanciesUseCaseOptions, DeleteObsoleteSourcedVacanciesUseCaseResult } from '../vacancy.useCases/DeleteObsoleteSourcedVacancies.useCase';

export const deleteObsoleteSourcedVacanciesResolver = makeServiceResolver<
  DeleteObsoleteSourcedVacanciesUseCaseOptions,
  DeleteObsoleteSourcedVacanciesUseCaseResult
>(
  DeleteObsoleteSourcedVacanciesUseCase,
);
