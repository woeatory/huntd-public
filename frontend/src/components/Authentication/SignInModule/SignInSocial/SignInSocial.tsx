import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import FormField
  from '@/components/FormElements/FormField/FormField.module.scss';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { Loader } from '@/ui/Loader';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { SocialButton } from '@/components/SocialButton';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useSocialSignUp } from '@/controllers/oauth/oauth.hooks/useSocialSignUp';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { useProcessSocialAuth } from '@/controllers/oauth/oauth.hooks/useProcessSocialAuth';

export const SignInSocial = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const [busy, setBusy] = useState(false);
  const [socialSignUpMutation, { loading }] = useSocialSignUp();
  const flashMessage = useFlashMessage();
  const processSocialAuth = useProcessSocialAuth();

  const socialButtonSubmit = useCallback(
    processSocialAuth,
    [socialSignUpMutation, flashMessage, t, processSocialAuth],
  );

  return (
    <div className={AuthForm.socialWrapper}>
      <Loader active={loading} />
      <p className={cn(FormField.label, 'mb-4 small-mb-12')}>
        {t(`${Namespaces.Auth}:sign_in_with`)}
      </p>

      <div className={AuthForm.socialButtons}>
        <SocialButton
          loading={busy}
          setLoading={setBusy}
          provider={OAuthProviders.Google}
          className={cn(AuthForm.socialButton)}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Google, socialSignUpMutation,
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
          className={AuthForm.socialButton}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Linkedin, socialSignUpMutation,
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
          className={AuthForm.socialButton}
          clickHandler={(profile) => socialButtonSubmit(
            profile, OAuthProviders.Github, socialSignUpMutation,
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
