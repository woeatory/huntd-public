import cn from 'classnames';
import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import buttons from '@/ui/buttons/buttons.module.scss';
import { Link } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { getProfileRedirect } from '@/controllers/user/user.utils/geProfileRedirect';

export const ConfirmEmailSuccessMessage = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const [user] = useAuthUser();

  return (
    <>
      <p className={cn(typography.alertText, 'c-semidark-chocolate mb-32')}>
        {t(`${Namespaces.Auth}:confirm_email_success_message`)}
      </p>
      <Link href={user ? getProfileRedirect(user) : Routes.SignIn}>
        <a
          className={cn(buttons.primary, 'wide')}
        >
          {t(`${Namespaces.Auth}:confirm_email_continue_link`)}
        </a>
      </Link>
    </>
  );
};
