import passport from 'passport';
import { makeController } from '@/core';
import { GitHubCallback } from '@/modules/oauth/oauth.useCases/GithubCallback.useCase';

export const githubCallbackController = makeController(GitHubCallback,
  (req) => ({ data: req.user }),
  [passport.authenticate('github')],
  (html, { res }) => {
    res.send(html);
  });
