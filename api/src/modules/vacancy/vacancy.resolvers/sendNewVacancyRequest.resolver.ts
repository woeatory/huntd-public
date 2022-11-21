import { makeAuthResolver } from '@/core';
import { SendNewVacancyRequestUseCaseResult, SendNewVacancyRequestUseCaseOptions, SendNewVacancyRequestUseCase } from '@/modules/vacancy/vacancy.useCases/SendNewVacancyRequest.useCase';

export const sendNewVacancyRequestResolver = makeAuthResolver<
  SendNewVacancyRequestUseCaseOptions,
  SendNewVacancyRequestUseCaseResult
>(
  SendNewVacancyRequestUseCase,
);
