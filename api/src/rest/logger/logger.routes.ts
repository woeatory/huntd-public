import cors from 'cors';
import express, { Application } from 'express';
import { LoggerControllers } from '@/modules/logger/logger.controllers';

export const initLoggerRouter = (app: Application) => {
  const loggerRouter = express.Router();

  loggerRouter.post('/', LoggerControllers.logService);

  app.use('/rest/logger', cors({ origin: '*' }), loggerRouter);
};

initLoggerRouter.exportsName = 'Logger';
