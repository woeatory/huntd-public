import { LoggerFactory } from '@/modules/logger/logger.typedefs';

export const makeLogger: LoggerFactory = (params, options = {}) => {
  const { TestLogger } = require('./TestLogger');

  return (
    new TestLogger({
      servicePrefix: params.prefix,
      ...options,
      name: options.name ? `Test Logger: ${options.name}` : 'Test Logger',
    })
  );
};
