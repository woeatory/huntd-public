import React, { memo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './MessageBox.module.scss';

interface Props {
  createdAt: string;
}

export const MessageDivider = memo<Props>(({ createdAt }) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <p className={styles.messageDivider}>
      {formatter.format(new Date(createdAt))}
    </p>
  );
});
