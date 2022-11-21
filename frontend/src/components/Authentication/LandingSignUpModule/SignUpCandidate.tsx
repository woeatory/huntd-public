import React, { SyntheticEvent, useState } from 'react';
import { InputEmailUI } from '@/components/FormElements/FormInputs/InputEmail';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import AuthForm
  from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { Button } from '@/ui/buttons/Button';
import { Router } from '@/controllers/i18n/i18n.client';
import { ProfileRoutes, Routes } from '@/controllers/router/router.constants';
import { analytics } from '@/controllers/analytics/analytics.client';

export const SignUpCandidate = () => {
  const [email, setEmail] = useState('');

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await Router.replace(`${Routes.SignUp}?email=${email}&redirect=${ProfileRoutes.Candidate}`);
  };

  return (
    <form onSubmit={onSubmit} className={AuthForm.authFormInputs}>
      <div className="mb-24">
        <InputEmailUI
          autoComplete="email"
          name="email"
          placeholder={t(`${Namespaces.Form}:email_label`)}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <Button
        mode={Button.mode.Primary}
        type="submit"
        className="wide"
        onClick={() => analytics.sendEvent(
          analytics.events.cta.CreateAccountClick,
          {},
        )}
        text={t(`${Namespaces.Home}:new_homepage_signup_button_text`)}
      />
    </form>
  );
};
