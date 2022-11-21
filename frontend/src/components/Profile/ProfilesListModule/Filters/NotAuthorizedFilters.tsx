import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { User } from '@/controllers/graphql/generated';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from './NotAuthorizedFilters.module.scss';
import { SIGN_UP_BENEFITS } from './Filters.constants';

export enum NotAuthorizedFiltersTypes {
  Mobile = 'disabledFiltersMobile',
  Desktop = 'disabledFilters',
}

interface Props {
  type: NotAuthorizedFiltersTypes
  user: User | null;
}

export const NotAuthorizedFilters: FC<Props> = ({ user, type }) => {
  const { t } = useTranslation([
    Namespaces.Common,
    Namespaces.Auth,
  ]);

  return (
    <>
      {!user && (
      <div className={cn(styles[type])}>
        <div className={styles.wrapper}>
          <h2 className={cn(typography.accentTitle, styles.title, 'mb-16')}>
            {t(`${Namespaces.Common}:not_authorized_filters_title`)}
          </h2>
          <ul className={styles.benefitsList}>
            {SIGN_UP_BENEFITS.map((benefitTranslateSlug) => (
              <li key={benefitTranslateSlug} className={styles.benefitItem}>
                <IconCheck />
                {t(benefitTranslateSlug)}
              </li>
            ))}
          </ul>
          <div className={styles.buttonsContainer}>
            <Button
              size={Button.size.LargeWide}
              className={styles.button}
              mode={Button.mode.Primary}
              href={Routes.SignUp}
              text={t(`${Namespaces.Common}:free_sign_up_button`)}
            />

            <Button
              size={Button.size.Small}
              className={styles.button}
              mode={Button.mode.BorderLess}
              href={Routes.SignIn}
              text={t(`${Namespaces.Auth}:sign_in_link`)}
            />
          </div>
        </div>
      </div>
      )}
    </>
  );
};
