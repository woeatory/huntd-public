import React from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { MobileApp } from '@/components/Homepage/MobileApp';
import typography from '@/ui/typography/typography.module.scss';
import styles from './MessageBox.module.scss';

export const MobileAppBox = () => {
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <div className={styles.mobileAppBoxContainer}>
      <div className={styles.messageBox}>
        <div className="grid-container full">
          <div className="grid-x">
            <div className='cell large-5 large-offset-1 mt-56 mb-40'>
              <p className={cn(typography.accentTitle, styles.emptyMessageHeading, 'mb-16')}>
                {t(`${Namespaces.Chat}:no_messages`)}
              </p>
              <p className={cn(typography.smallText)}>
                {t(`${Namespaces.Chat}:here_you_will_chat`)}
              </p>
            </div>
            <div className="cell large-offset-1">
              <MobileApp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
