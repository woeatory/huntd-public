import { githubCallbackController } from '@/modules/oauth/oauth.controllers/githubCallback.controller';
import { githubController } from '@/modules/oauth/oauth.controllers/github.controller';
import { googleCallbackController } from '@/modules/oauth/oauth.controllers/googleCallback.controller';
import { googleController } from '@/modules/oauth/oauth.controllers/google.controller';
import { linkedinCallbackController } from '@/modules/oauth/oauth.controllers/linkedinCallback.controller';
import { linkedinController } from '@/modules/oauth/oauth.controllers/linkedin.controller';

export const OAuthControllers = {
  githubController,
  githubCallbackController,
  googleController,
  googleCallbackController,
  linkedinCallbackController,
  linkedinController,
};
