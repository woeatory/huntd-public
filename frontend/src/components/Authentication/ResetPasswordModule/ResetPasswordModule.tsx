import React from 'react';
import cn from 'classnames';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import FormField from '@/components/FormElements/FormField/FormField.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { ResetPasswordForm } from '@/components/Authentication/ResetPasswordModule/ResetPasswordForm';

export const ResetPasswordModule = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  return (
    <div className={AuthForm.authFormSimple}>
      <h1 className={cn(FormField.label, 'mb-4')}>
        {t(`${Namespaces.Auth}:reset_password_page_title`)}
      </h1>
      <p className={cn(typography.alertText, 'c-semidark-chocolate mb-24')}>
        {t(`${Namespaces.Auth}:reset_password_page_message`)}
      </p>
      <ResetPasswordForm />
    </div>
  );
};
