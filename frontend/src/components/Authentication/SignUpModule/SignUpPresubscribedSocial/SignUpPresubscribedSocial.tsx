import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { SocialButton } from '@/components/SocialButton';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { Loader } from '@/ui/Loader';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useSocialPresubscribedSignUp } from '@/controllers/oauth/oauth.hooks/useSocialPresubscribedSignUp';
import LandingSignUpModule from '@/components/Authentication/LandingSignUpModule/LandingSignUpModule.module.scss';
import { useProcessSocialAuth } from '@/controllers/oauth/oauth.hooks/useProcessSocialAuth';

export const SignUpPresubscribedSocial = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const { query } = useRouter();

  const [socialSignUpMutation, { loading }] = useSocialPresubscribedSignUp();
  const [busy, setBusy] = useState(false);
  const processSocialAuth = useProcessSocialAuth({
    username: query.companyId as string,
  });
  const flashMessage = useFlashMessage();

  const socialButtonSubmit = useCallback(
    processSocialAuth,
    [socialSignUpMutation, flashMessage, t, processSocialAuth],
  );

  return (
    <div>
      <Loader active={loading} />
      <div>
        <SocialButton
          loading={busy}
          setLoading={setBusy}
          provider={OAuthProviders.Google}
          className={LandingSignUpModule.socialButton}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Google,
          )}
          title={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'Google',
          })}
          aria-label={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'Google',
          })}
        >
          <IconGoogle />
        </SocialButton>

        <SocialButton
          loading={busy}
          setLoading={setBusy}
          provider={OAuthProviders.Linkedin}
          className={LandingSignUpModule.socialButton}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Linkedin,
          )}
          title={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'Linkedin',
          })}
          aria-label={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'Linkedin',
          })}
        >
          <IconLinkedin />
        </SocialButton>

        <SocialButton
          loading={busy}
          setLoading={setBusy}
          provider={OAuthProviders.Github}
          className={LandingSignUpModule.socialButton}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Github,
          )}
          title={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'GitHub',
          })}
          aria-label={t(`${Namespaces.Auth}:sign_in_with`, {
            provider: 'GitHub',
          })}
        >
          <IconGithub />
        </SocialButton>
      </div>

    </div>
  );
};
