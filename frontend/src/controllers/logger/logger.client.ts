import { getApiLink } from '@/lib/getApiLink';
import {
  LoggerBody,
  LoggerOptions,
  LogMessage,
  LogTypes,
} from '@/controllers/logger/logger.typedefs';
import { getCurrentRoute } from '@/lib/getCurrentRoute';
import { getDeviceInfo } from '@/lib/getDeviceInfo';

const processLogArguments = (args: Array<LogMessage>) => [
  ...args,
  getCurrentRoute(),
  getDeviceInfo(),
]
  .map((log) => (typeof log === 'string'
    ? log
    : JSON.stringify(log)
  ))
  .join('\n');

export const createLogger = (options: LoggerOptions) => {
  const link = getApiLink('rest/logger');

  const log = async (type: LogTypes, ...args: Array<LogMessage>) => {
    const body: LoggerBody = {
      service: 'frontend',
      type,
      message: processLogArguments(args),
      loggerOptions: options,
    };

    try {
      await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      // do nothing
    }
  };

  return {
    info: (...args: Array<LogMessage>) => log(LogTypes.Info, ...args),
    warning: (...args: Array<LogMessage>) => log(LogTypes.Warning, ...args),
    error: (...args: Array<LogMessage>) => log(LogTypes.Error, ...args),
  };
};
