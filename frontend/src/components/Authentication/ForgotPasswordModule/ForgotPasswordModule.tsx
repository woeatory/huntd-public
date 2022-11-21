import React, { useState } from 'react';
import cn from 'classnames';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { ForgotPasswordForm } from '@/components/Authentication/ForgotPasswordModule/ForgotPasswordForm';
import FormField from '@/components/FormElements/FormField/FormField.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { ForgotPasswordSuccessMessage } from '@/components/Authentication/ForgotPasswordModule/ForgotPasswordSuccessMessage';

export const ForgotPasswordModule = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className={AuthForm.authFormSimple}>
      <h1 className={cn(FormField.label, 'mb-4')}>
        {t(`${Namespaces.Auth}:forgot_password_page_title`)}
      </h1>
      {messageSent
        ? (
          <ForgotPasswordSuccessMessage />
        )
        : (
          <>
            <p className={cn(typography.alertText, 'c-semidark-chocolate mb-24')}>
              {t(`${Namespaces.Auth}:forgot_password_page_message`)}
            </p>
            <ForgotPasswordForm onSuccess={() => setMessageSent(true)} />
          </>
        )}
    </div>
  );
};
