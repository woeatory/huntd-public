import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import { CreateSourcedVacanciesUseCase, CreateSourcedVacanciesUseCaseOptions, CreateSourcedVacanciesUseCaseResult } from '../vacancy.useCases/CreateSourcedVacancies.useCase';

export const createSourcedVacanciesResolver = makeServiceResolver<
  CreateSourcedVacanciesUseCaseOptions,
  CreateSourcedVacanciesUseCaseResult
>(
  CreateSourcedVacanciesUseCase,
);
