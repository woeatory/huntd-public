import React, { FC } from 'react';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { IconDoubleCheck } from '@/ui/icons/general/IconDoubleCheck';
import styles from './MessageStatus.module.scss';

interface Props {
  unread: boolean;
}
export const MessageStatus: FC<Props> = ({ unread }) => (
  <div className={styles.iconWrapper}>
    {unread
      ? (
        <IconCheck />
      )
      : (
        <IconDoubleCheck />
      )}
  </div>
);
