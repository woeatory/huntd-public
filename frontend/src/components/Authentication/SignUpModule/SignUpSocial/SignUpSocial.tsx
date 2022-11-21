import React, { useCallback, useState, FC } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import FormField
  from '@/components/FormElements/FormField/FormField.module.scss';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { SocialButton } from '@/components/SocialButton';
import { OAuthProviders } from '@/controllers/graphql/generated';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import LandingSignUpModule from '@/components/Authentication/LandingSignUpModule/LandingSignUpModule.module.scss';
import { useSocialSignUp } from '@/controllers/oauth/oauth.hooks/useSocialSignUp';
import { Loader } from '@/ui/Loader';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useProcessSocialAuth } from '@/controllers/oauth/oauth.hooks/useProcessSocialAuth';

interface Props {
  mode: string;
}

export enum SignUpSocialMode {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export const SignUpSocial: FC<Props> = ({ mode }) => {
  const { t } = useTranslation([Namespaces.Auth]);
  const [socialSignUpMutation, { loading }] = useSocialSignUp();
  const [busy, setBusy] = useState(false);
  const processSocialAuth = useProcessSocialAuth();
  const flashMessage = useFlashMessage();

  const socialButtonSubmit = useCallback(
    processSocialAuth,
    [socialSignUpMutation, flashMessage, t, processSocialAuth],
  );

  const isHorizontal = mode === SignUpSocialMode.Horizontal;
  const isVertical = mode === SignUpSocialMode.Vertical;

  const buttonClassName = isHorizontal
    ? LandingSignUpModule.socialButton
    : AuthForm.socialButton;

  return (
    <div>
      <Loader active={loading} />
      {isVertical && (
        <p className={cn(FormField.label, 'mb-4 small-mb-12')}>
          {t(`${Namespaces.Auth}:sign_up_with`)}
        </p>
      )}

      <div
        className={cn({
          [AuthForm.socialButtons]: !isHorizontal,
        })}
      >
        <SocialButton
          loading={busy}
          setLoading={setBusy}
          provider={OAuthProviders.Google}
          className={buttonClassName}
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
          className={buttonClassName}
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
          className={buttonClassName}
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
