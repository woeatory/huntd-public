import Config from 'react-native-config';
import {
  LoggerBody, LoggerMessage, LoggerOptions, LoggerTypes,
} from '@/controllers/logger/logger.interfaces';
import { getDeviceInfo } from '@/controllers/notifications/notifications.utils/notification.getDeviceInfo';

const processLogArguments = (args: Array<LoggerMessage>) => {
  const logs = args.map((log) => (
    typeof log === 'string' ? log : JSON.stringify(log)
  ));

  return logs.join('\n');
};

export const createLogger = (options: LoggerOptions) => {

  const log = async (
    type: LoggerTypes,
    ...args: LoggerMessage[]
  ) => {

    const loggerMessage = processLogArguments([
      ...args,
      getDeviceInfo(),
    ]);

    const body: LoggerBody = {
      service: 'mobile',
      type,
      message: loggerMessage,
      loggerOptions: options,
    };

    try {
      await fetch(`${Config.API_ENDPOINT}/rest/logger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch {
      // do nothing
    }
  };

  return {
    info: (...args: LoggerMessage[]) => log(LoggerTypes.Info, ...args),
    warning: (...args: LoggerMessage[]) => log(LoggerTypes.Warning, ...args),
    error: (...args: LoggerMessage[]) => log(LoggerTypes.Error, ...args),
  };
};
