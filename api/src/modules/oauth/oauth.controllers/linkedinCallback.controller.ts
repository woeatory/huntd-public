import passport from 'passport';
import { LinkedinCallbackUseCase } from '@/modules/oauth/oauth.useCases/LinkedinCallback.useCase';
import { makeController } from '@/core';

export const linkedinCallbackController = makeController(
  LinkedinCallbackUseCase,
  (req) => ({ data: req.user }),
  [passport.authenticate('linkedin')],
  (html, { res }) => {
    res.send(html);
  },
);
