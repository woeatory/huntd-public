import { AppEnvironments } from '@mate-academy/core';

export const getSlackChannelEnv = (channel:string): string => (
  process.env.APP_ENV === AppEnvironments.Production
    ? `${channel}`
    : `${channel}_development`);
