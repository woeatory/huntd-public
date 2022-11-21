import cn from 'classnames';
import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import buttons from '@/ui/buttons/buttons.module.scss';
import { Link } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';

export const ForgotPasswordSuccessMessage = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  return (
    <>
      <p className={cn(typography.alertText, 'c-semidark-chocolate mb-24')}>
        {t(`${Namespaces.Auth}:forgot_password_email_sent`)}
      </p>
      <Link href={Routes.SignIn}>
        <a
          className={cn(buttons.primary, 'wide')}
        >
          {t(`${Namespaces.Auth}:sign_in_link`)}
        </a>
      </Link>
    </>
  );
};
