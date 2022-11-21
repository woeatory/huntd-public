import { useMemo } from 'react';
import { LoggerOptions } from '@/controllers/logger/logger.typedefs';
import { createLogger } from '@/controllers/logger/logger.client';

export const useLogger = (options: LoggerOptions) => useMemo(
  () => createLogger(options),
  [options],
);
