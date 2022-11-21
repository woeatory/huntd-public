import { makeController } from '@/core';
import {
  LogServiceUseCase,
  LogServiceUseCaseOptions,
  LogServiceUseCaseResult,
} from '@/modules/logger/logger.useCases/LogService.useCase';

export const logServiceController = makeController<
  LogServiceUseCaseOptions,
  LogServiceUseCaseResult
>(
  LogServiceUseCase,
  (req) => ({
    service: req.body.service,
    message: req.body.message,
    type: req.body.type,
    loggerOptions: req.body.loggerOptions,
  }),
);
