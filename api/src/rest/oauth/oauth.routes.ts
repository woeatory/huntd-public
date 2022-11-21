import express, { Application } from 'express';
import { OAuthControllers } from '@/modules/oauth/oauth.controllers';

export const initOAuthRouter = (app: Application) => {
  const oAuthRouter = express.Router();

  oAuthRouter.get('/github', OAuthControllers.githubController);

  oAuthRouter.get('/github/callback', OAuthControllers.githubCallbackController);

  oAuthRouter.get('/google', OAuthControllers.googleController);

  oAuthRouter.get('/google/callback', OAuthControllers.googleCallbackController);

  oAuthRouter.get('/linkedin', OAuthControllers.linkedinController);

  oAuthRouter.get('/linkedin/callback', OAuthControllers.linkedinCallbackController);

  app.use('/rest/oauth', oAuthRouter);
};

initOAuthRouter.exportsName = 'OAuth';
