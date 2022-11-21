import { DebugLogger, CloudWatchLogger } from '@mate-academy/core';
import { LoggerFactory } from '@/modules/logger/logger.typedefs';
import {
  isDebugEnv,
} from '@/modules/logger/logger.constants';

const makeDebugLogger: LoggerFactory = (params, options = {}) => (
  new DebugLogger({
    servicePrefix: params.prefix,
    ...options,
  })
);

const makeCloudWatchLogger: LoggerFactory = (params, options = {}) => (
  new CloudWatchLogger({
    logGroupName: params.logGroupName,
    ...options,
  })
);

export const makeLogger: LoggerFactory = isDebugEnv
  ? makeDebugLogger
  : makeCloudWatchLogger;
