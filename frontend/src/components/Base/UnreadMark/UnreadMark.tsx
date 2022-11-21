import React, { memo } from 'react';
import cn from 'classnames';
import { Selectors } from '@/lib/selectors';
import styles from './UnreadMark.module.scss';

interface Props {
  active: boolean;
}
export const UnreadMark = memo<Props>(
  ({ active }) => (
    <div
      className={cn(styles.unreadMark, 'unread-mark', {
        [Selectors.Active]: active,
      })}
    />
  ),
);
