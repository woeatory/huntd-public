import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { AppButtons } from '@/components/Homepage/MobileApp/AppsButtons';
import { AppDevice } from '@/components/Homepage/MobileApp/AppDevice';
import styles from './MobileAppHero.module.scss';

export const MobileAppHero = () => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn('grid-x c-semidark-chocolate', styles.container)}>
      <div className={cn(styles.description, 'cell medium-6')}>
        <h2 className={cn(styles.title, 'mb-16')}>
          {t(`${Namespaces.Home}:mobile_app_hero_title`)}
        </h2>

        <p className={typography.alertText}>
          {t(`${Namespaces.Home}:mobile_app_hero_description`)}
        </p>

        <AppButtons className={styles.descriptionButtons} />
      </div>

      <div className='cell auto'>
        <AppDevice
          className={styles.device}
          buttonsClassName={styles.storeButton}
        />
      </div>
    </div>
  );
};
