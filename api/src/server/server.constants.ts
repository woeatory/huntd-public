import { AppEnvironments } from '@mate-academy/core';

export const origins = {
  [AppEnvironments.Local]: [/local.huntd.tech$/, /localhost/],
  [AppEnvironments.Development]: [/dev.huntd.tech$/],
  [AppEnvironments.Staging]: [/stage.huntd.tech$/],
  [AppEnvironments.Production]: [/huntd.tech$/],
  [AppEnvironments.Test]: false,
};
