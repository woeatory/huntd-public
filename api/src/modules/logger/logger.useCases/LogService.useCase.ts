import {
  ClientError,
  ClientErrorLevels, LoggerOptions,
  LogLevels,
  ValidationRules,
} from '@mate-academy/core';
import { AppServices, loggerServiceParams } from '@/modules/logger/logger.constants';
import { UseCase } from '@/core';
import { makeLogger } from '@/modules/logger/logger.factory';

export interface LogServiceUseCaseOptions {
  service: AppServices;
  message: string;
  type: LogLevels;
  loggerOptions: LoggerOptions;
}
export type LogServiceUseCaseResult = void;

type Options = LogServiceUseCaseOptions;
type Result = LogServiceUseCaseResult;

export class LogServiceUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      service: ['required', { one_of: Object.values(AppServices) }],
      message: ['required', 'string'],
      type: ['required', { one_of: Object.values(LogLevels) }],
      loggerOptions: [{
        nested_object: {
          name: ['string'],
          parents: [{ list_of: 'string' }],
          userId: ['positive_integer'],
        },
      }],
    };
  }

  private static LogTypes = {
    [LogLevels.Debug]: LogLevels.Debug,
    [LogLevels.Info]: LogLevels.Info,
    [LogLevels.Warning]: LogLevels.Warning,
    [LogLevels.Error]: LogLevels.Error,
  }

  private static getLogType(level: LogLevels) {
    return LogServiceUseCase.LogTypes[level] || LogLevels.Info;
  }

  protected async run(options: Options): Promise<Result> {
    const {
      service, message, type, loggerOptions,
    } = options;

    if (!loggerServiceParams[service]) {
      throw new ClientError({
        message: 'Service logger not implemented',
        level: ClientErrorLevels.Error,
        fields: {
          service,
        },
      });
    }

    const logger = makeLogger(
      loggerServiceParams[service],
      loggerOptions,
    );

    await logger[LogServiceUseCase.getLogType(type)](message);
  }
}
