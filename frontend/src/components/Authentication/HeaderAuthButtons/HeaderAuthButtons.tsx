import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Link } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';
import buttons from '@/ui/buttons/buttons.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './HeaderAuthButtons.module.scss';

export const HeaderAuthButtons = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  const { route } = useRouter();
  const signUpButtonText = (route === Routes.Candidates
  || route === Routes.CompaniesHome)
    ? t(`${Namespaces.Common}:free_sign_up_button`)
    : t(`${Namespaces.Auth}:sign_up_link`);

  return (
    <div className={styles.authButtonsContainer}>
      <Link href={Routes.SignIn}>
        <a
          href={Routes.SignIn}
          className={cn(
            styles.buttonSignIn,
            styles.authButton,
            buttons.button,
          )}
          onClick={() => analytics.sendEvent(
            analytics.events.cta.SignInLinkClick,
            {},
          )}
        >
          {t(`${Namespaces.Auth}:sign_in_link`)}
        </a>
      </Link>

      <Link href={Routes.SignUp}>
        <a
          href={Routes.SignUp}
          className={cn(buttons.primary, styles.authButton)}
          onClick={() => analytics.sendEvent(
            analytics.events.cta.SignUpLinkClick,
            {},
          )}
        >
          {signUpButtonText}
        </a>
      </Link>
    </div>
  );
};
