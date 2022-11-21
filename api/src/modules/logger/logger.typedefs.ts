import { Logger, LoggerOptions } from '@mate-academy/core';

export interface ServiceParams {
  prefix: string;
  logGroupName: string;
}

export type LoggerFactory = (
  serviceParams: ServiceParams,
  options?: LoggerOptions,
) => Logger;
