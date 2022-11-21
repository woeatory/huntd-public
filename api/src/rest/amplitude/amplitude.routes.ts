import { Application, Router } from 'express';
import { AmplitudeControllers } from '@/modules/amplitude/amplitude.controllers';

export const initAmplitudeRouter = (app: Application) => {
  const amplitudeRouter = Router();

  amplitudeRouter.get('/', AmplitudeControllers.sendEventController);
  amplitudeRouter.post('/', AmplitudeControllers.sendEventController);

  app.use('/rest/amplitude', amplitudeRouter);
};

initAmplitudeRouter.exportsName = 'Amplitude';
