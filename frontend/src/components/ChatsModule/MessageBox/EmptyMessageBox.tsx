import React from 'react';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './MessageBox.module.scss';

export const EmptyMessageBox = () => {
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <div className={styles.messageBox}>
      <p className={styles.emptyMessage}>
        {t(`${Namespaces.Chat}:no_chat_selected`)}
      </p>
    </div>
  );
};
