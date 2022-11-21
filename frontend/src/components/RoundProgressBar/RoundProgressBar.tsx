import React, { FC } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import typography from '@/ui/typography/typography.module.scss';
import styles from './RoundProgressBar.module.scss';

interface Props {
  className: string,
  value: number;
  minValue: number;
  maxValue: number;
  strokeWidth: number;
  pathColor: string;
  trailColor: string;
}

export const RoundProgressBar: FC<Props> = ({
  className, value, minValue,
  maxValue, strokeWidth, pathColor, trailColor,
}) => (
  <div>
    <div className={className}>
      <CircularProgressbarWithChildren
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        strokeWidth={strokeWidth}
        className={styles.wrapper}
        styles={buildStyles({
          pathColor,
          trailColor,
        })}
      >
        <div className="c-semidark-chocolate">
          <span className={typography.caption}>
            {value}
            /
          </span>
          <span className={typography.overhead}>
            {maxValue}
          </span>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  </div>
);
