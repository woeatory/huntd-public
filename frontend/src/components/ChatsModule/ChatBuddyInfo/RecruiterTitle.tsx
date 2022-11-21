import React, { FC } from 'react';
import cn from 'classnames';
import { TimeAgoModule } from '@/components/Base/TimeAgoModule/TimeAgoModule';
import typography from '@/ui/typography/typography.module.scss';
import styles from './ChatBuddyInfo.module.scss';

interface Props {
  computedName: string
  position: string
  profileLastActionTime: string | null
  companyName: string
}

export const RecruiterTitle: FC<Props> = ({
  computedName, position,
  companyName, profileLastActionTime,
}) => (
  <div className={styles.buddyInfo}>
    <h1
      className={cn('c-semidark-chocolate', typography.underhead)}
    >
      <span className={styles.buddyProfileLink}>
        {computedName}
      </span>

      {' '}

      <TimeAgoModule
        lastActionTime={profileLastActionTime}
      />
    </h1>

    <p className={cn('c-gray', typography.smallText)}>
      {companyName}
      {position}
    </p>

  </div>
);
