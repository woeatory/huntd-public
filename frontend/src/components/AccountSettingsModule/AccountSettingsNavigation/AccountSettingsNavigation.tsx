import React, { memo } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Tabs from '@/components/Profile/StepperModule/Tabs/Tabs.module.scss';
import { ActiveNavLink } from '@/components/Base/ActiveNavLink';
import { SettingsRoutes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Selectors } from '@/lib/selectors';
import styles from './AccountSettingsNavigation.module.scss';

export const AccountSettingsNavigation = memo(() => {
  const { t } = useTranslation([Namespaces.Profile]);
  const { query } = useRouter();

  return (
    <div className="grid-container mt-40">
      <div className="grid-x grid-margin-x">
        <div className="cell large-offset-3 large-3">
          <nav className={styles.navigationWrapper}>
            {Object.entries(SettingsRoutes).map(([key, slug]) => (
              <ActiveNavLink
                key={key}
                href={slug}
              >
                <a className={cn(styles.navLink, {
                  [Selectors.Active]: Object.values(SettingsRoutes)
                    .includes(query.tab as SettingsRoutes),
                })}
                >
                  {t(`${Namespaces.Profile}:settings_${key.toLowerCase()}_tab`)}
                </a>
              </ActiveNavLink>
            ))}
          </nav>
          <div className={cn(Tabs.tabsLine)} />
        </div>
      </div>
    </div>
  );
});
