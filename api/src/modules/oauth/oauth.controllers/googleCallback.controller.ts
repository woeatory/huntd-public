import passport from 'passport';
import { GoogleCallback } from '@/modules/oauth/oauth.useCases/GoogleCallback.useCase';
import { makeController } from '@/core';

export const googleCallbackController = makeController(GoogleCallback,
  (req) => ({ data: req.user }),
  [passport.authenticate('google')],
  (html, { res }) => {
    res.send(html);
  });
