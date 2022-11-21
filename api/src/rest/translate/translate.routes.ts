import { Application, Router } from 'express';
import cors from 'cors';
import { TranslateControllers } from '@/modules/translate/translate.controllers';

export const initTranslateRouter = (app: Application): void => {
  const translateRouter = Router();

  translateRouter.get('/', TranslateControllers.getAllTranslates);
  translateRouter.post('/', TranslateControllers.saveMissingTranslates);

  app.use('/rest/translates', cors({ origin: '*' }), translateRouter);
};

initTranslateRouter.exportsName = 'Translate';
