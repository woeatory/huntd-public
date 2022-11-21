import React, { FC } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import typography from '@/ui/typography/typography.module.scss';
import { RoundProgressBar } from '@/components/RoundProgressBar';
import { ConnectionsHintValues } from '@/components/Profile/profile.constants';
import { ConnectionsHintModule } from '@/components/Profile/ConnectionsHintModule';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';
import { getConnectionsHintMaxValue } from '@/controllers/recruiterProfile/getConnectionsHintMaxValue';
import styles from './MessageBox.module.scss';

interface Props {
  profileConnectionsCount: number;
}

export const ConnectionsBox:FC<Props> = ({ profileConnectionsCount }) => {
  const { t } = useTranslation([Namespaces.Chat]);

  const maxHintValue = getConnectionsHintMaxValue(profileConnectionsCount);

  return (
    <div className={styles.connectionsBoxContainer}>
      <div className={styles.connectionsBoxContent}>
        <RoundProgressBar
          className={styles.connectionsProgressBar}
          value={profileConnectionsCount}
          minValue={ConnectionsHintValues.minValue}
          maxValue={maxHintValue}
          strokeWidth={ConnectionsHintValues.strokeWidth}
          pathColor={ConnectionsHintValues.pathColor}
          trailColor={ConnectionsHintValues.trailColor}
        />

        <p className={cn(typography.accentTitle, 'mt-24 mb-8')}>{t(`${Namespaces.Chat}:no_messages`)}</p>

        <ConnectionsHintModule
          count={profileConnectionsCount}
        />

        <Button
          className="mt-24"
          mode={Button.mode.Primary}
          href={Routes.Candidates}
          text={t(`${Namespaces.Profile}:search_candidates_button`)}
        />
      </div>
    </div>
  );
};
