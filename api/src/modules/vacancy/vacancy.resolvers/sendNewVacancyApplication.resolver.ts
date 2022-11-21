import { makeAuthResolver } from '@/core';
import {
  SendNewVacancyApplicationUseCaseResult,
  SendNewVacancyApplicationUseCaseOptions,
  SendNewVacancyApplicationUseCase,
} from '@/modules/vacancy/vacancy.useCases/SendNewVacancyApplication.useCase';

export const sendNewVacancyApplicationResolver = makeAuthResolver<
  SendNewVacancyApplicationUseCaseOptions,
  SendNewVacancyApplicationUseCaseResult
>(
  SendNewVacancyApplicationUseCase,
);
