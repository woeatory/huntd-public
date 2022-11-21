import { NodeEnvironments } from '@mate-academy/core';
import { ServiceParams } from '@/modules/logger/logger.typedefs';

export const DEBUG_ENV = [NodeEnvironments.Development];

export const isDebugEnv = DEBUG_ENV.includes(
  process.env.NODE_ENV,
);

export enum AppServices {
  Api = 'api',
  Frontend = 'frontend',
  Mobile = 'mobile',
}

export const loggerServiceParams: Record<AppServices, ServiceParams> = {
  [AppServices.Api]: {
    prefix: '[API]',
    logGroupName: `huntd/${process.env.APP_ENV}/${AppServices.Api}`,
  },
  [AppServices.Frontend]: {
    prefix: '[FRONTEND]',
    logGroupName: `huntd/${process.env.APP_ENV}/${AppServices.Frontend}`,
  },
  [AppServices.Mobile]: {
    prefix: '[MOBILE]',
    logGroupName: `huntd/${process.env.APP_ENV}/${AppServices.Mobile}`,
  },
};
