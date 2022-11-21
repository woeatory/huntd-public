import React, { FC } from 'react';
import cn from 'classnames';
import { IconClose } from '@/ui/icons/general/IconClose';
import { IconEditMessage } from '@/ui/icons/general/IconEditMessage';
import { Button } from '@/ui/buttons/Button';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './MessageForEditInfo.module.scss';

export const MessageForEditInfo:FC = () => {
  const { setIsMessageEditing, message, setMessage } = useBuddyChatContext();
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <div className={cn(styles.infoBlockWrapper, 'mb-8')}>
      <div className={styles.iconContainer}>
        <IconEditMessage />
      </div>
      <div className={styles.mainPartWrapper}>
        <div className={styles.textBlockWrapper}>
          <p className={styles.editMessageTitle}>
            {t(`${Namespaces.Chat}:edit_message_text`)}
          </p>
          <p>
            {message}
          </p>
        </div>
        <Button
          className={styles.closeButton}
          onClick={() => {
            setIsMessageEditing(false);
            setMessage('');
          }}
          LeftIcon={IconClose}
        />
      </div>
    </div>
  );
};
