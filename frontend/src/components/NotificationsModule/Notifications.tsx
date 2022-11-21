import React from 'react';
import cn from 'classnames';
import styles from '@/components/NotificationsModule/Notifications.module.scss';
import { IconNotification } from '@/ui/icons/general/IconNotification';

export const Notifications = () => (
  <div className={cn(styles.notifications)}>
    <button type="button" className={cn(styles.bell)}>
      <IconNotification />
    </button>
    {/* TODO: add "notifications" field to user api and make a dropping list */}
  </div>
);
