import React, { FC } from 'react';
import cn from 'classnames';
import { TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters/Filters.constants';
import { MapImage } from '@/ui/icons/general/MapImage';
import styles from './TimezoneInteractiveMap.module.scss';

interface Props {
  className?: string;
}

const timezones = new Array(TimezoneRange.Max - TimezoneRange.Min + 1)
  .fill(0)
  .map((_, idx) => TimezoneRange.Min + idx);

function between(
  x: number,
  min: number,
  max: number,
  isRangedOutside: boolean,
) {
  return isRangedOutside
    ? x < min || x > max
    : x >= min && x <= max;
}

interface Props {
  className?: string;
  timezoneFrom: number;
  timezoneTo: number;
  isRangedOutside: boolean;
}

export const TimezoneInteractiveMap: FC<Props> = (props) => {
  const {
    timezoneFrom, timezoneTo, isRangedOutside, className,
  } = props;

  return (
    <div className={cn('mb-16', styles.timezoneMapContainer, className)}>
      <MapImage />
      <div className={styles.timezoneLinesContainer}>
        {timezones.map((number) => (
          <div
            className={cn(styles.timezone, {
              [styles.active]: between(
                number,
                timezoneFrom,
                timezoneTo,
                isRangedOutside,
              ),
            })}
            key={number}
          />
        ))}
      </div>
    </div>
  );
};
