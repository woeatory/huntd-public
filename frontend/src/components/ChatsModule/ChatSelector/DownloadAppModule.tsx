import React from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import typography from '@/ui/typography/typography.module.scss';
import { IconMobileAppQR } from '@/ui/icons/general/IconMobileAppQR';
import { AppButtons } from '@/components/Homepage/MobileApp/AppsButtons';
import styles from './ChatSelector.module.scss';

export const DownloadAppModule = () => {
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <div className={styles.downloadAppWrapper}>
      <p className={cn(typography.caption, 'c-semidark-chocolate mb-8')}>
        {t(`${Namespaces.Chat}:download_huntd_app`)}
      </p>
      <div className={cn(styles.linksContainer)}>
        <AppButtons
          className={styles.buttonsWrapper}
          buttonsClassName={styles.downloadButton}
        />
        <div className={styles.codeContainer}>
          <IconMobileAppQR />
        </div>
      </div>
    </div>
  );
};
