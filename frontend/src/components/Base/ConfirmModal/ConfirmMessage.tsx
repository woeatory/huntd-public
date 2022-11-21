import React, { FC } from 'react';
import cn from 'classnames';
import { ConfirmStateInterface } from '@/controllers/confirm/confirm.cache';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './ConfirmMessage.module.scss';

export const ConfirmMessage: FC<ConfirmStateInterface> = ((props) => {
  const { t } = useTranslation([Namespaces.Chat]);

  const {
    onConfirm,
    onCancel,
    confirmText = t(`${Namespaces.Chat}:confirm_text`),
    cancelText = t(`${Namespaces.Chat}:cancel_text`),
    title = t(`${Namespaces.Chat}:confirm_title`),
    body = t(`${Namespaces.Chat}:confirm_body`),
  } = props;

  return (
    <div className={styles.messageWrapper}>
      <h3 className={cn('mb-32 mr-40', typography.accentTitle)}>
        {title}
      </h3>
      <p className={cn('mb-32 c-gray', typography.smallText, styles.confirmMessage)}>
        {body}
      </p>
      <div className={styles.actionWrapper}>
        <Button
          mode={Button.mode.Primary}
          className={styles.actionButton}
          text={confirmText}
          onClick={onConfirm}
        />
        <Button
          mode={Button.mode.Secondary}
          className={styles.actionButton}
          text={cancelText}
          onClick={onCancel}
        />
      </div>
    </div>
  );
});
