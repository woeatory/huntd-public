import { useMemo } from 'react';
import { createLogger } from '@/controllers/logger/logger.client';
import { LoggerOptions } from '@/controllers/logger/logger.interfaces';

export const useLogger = (options: LoggerOptions) => useMemo(
  () => createLogger(options),
  [options],
);
