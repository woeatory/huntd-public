import { Logger, LoggerOptions } from '@mate-academy/core';
import { AppServices, loggerServiceParams } from '@/modules/logger/logger.constants';
import { makeLogger } from '@/modules/logger/logger.factory';

const rootApiLogger = makeLogger(
  loggerServiceParams[AppServices.Api],
  { name: 'API Root' },
);

const makeApiLogger = (options: LoggerOptions = {}): Logger => (
  makeLogger(loggerServiceParams[AppServices.Api], options)
);

export {
  rootApiLogger as rootLogger,
  makeApiLogger,
};
