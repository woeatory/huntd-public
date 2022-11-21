import React, { useEffect, FC } from 'react';
import cn from 'classnames';
import { AlertMessageItem } from '@/components/Base/AlertMessage/AlertMessageItem/AlertMessageItem';
import { useAlertMessage } from '@/controllers/alertMessage/alertMessage.hooks/useAlertMessage';
import { Selectors } from '@/lib/selectors';
import styles from './AlertMessage.module.scss';

interface Props {
  isModalOpened?: boolean;
}

export const AlertMessage: FC<Props> = ({ isModalOpened }) => {
  const alertMessage = useAlertMessage();

  useEffect(() => {
    document.documentElement.classList.toggle(
      Selectors.AlertMessageVisible,
      !!alertMessage,
    );
  }, [alertMessage]);

  if (!alertMessage) {
    return null;
  }

  return (
    <div
      className={cn(styles.alertMessageWrapper, {
        [styles.withOpenedModal]: isModalOpened,
      })}
    >
      <AlertMessageItem {...alertMessage} />
    </div>
  );
};
