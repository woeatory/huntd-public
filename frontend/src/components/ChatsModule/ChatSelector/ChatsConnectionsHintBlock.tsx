import React, { FC } from 'react';
import { ConnectionsHintValues } from '@/components/Profile/profile.constants';
import { RoundProgressBar } from '@/components/RoundProgressBar';
import { ConnectionsHintModule } from '@/components/Profile/ConnectionsHintModule';
import { getConnectionsHintMaxValue } from '@/controllers/recruiterProfile/getConnectionsHintMaxValue';
import styles from './ChatSelector.module.scss';

interface Props {
  connectionsCount: number;
}

export const ChatsConnectionsHintBlock: FC<Props> = ({ connectionsCount }) => {
  const maxHintValue = getConnectionsHintMaxValue(connectionsCount);

  return (
    <div className={styles.connectionsHintBlock}>
      <RoundProgressBar
        className={styles.progressBarContainer}
        value={connectionsCount}
        minValue={ConnectionsHintValues.minValue}
        maxValue={maxHintValue}
        strokeWidth={ConnectionsHintValues.strokeWidth}
        pathColor={ConnectionsHintValues.pathColor}
        trailColor={ConnectionsHintValues.trailColor}
      />
      <ConnectionsHintModule
        count={connectionsCount}
      />
    </div>
  );
};
