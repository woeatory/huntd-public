import React, { FC, useMemo } from 'react';
import TimeAgo from 'timeago-react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Selectors } from '@/lib/selectors';
import { MINUTE } from '@/lib/time';
import TimeAgoStyles from './TimeAgoModule.module.scss';

export enum TimeAgoModes {
  AbsoluteTime = 'absolute_time',
}

interface Props {
  lastActionTime: string | null;
  mode?: TimeAgoModes;
}

export const TimeAgoModule: FC<Props> = (props) => {
  const { lastActionTime, mode } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const isUserOnline = useMemo(() => {
    if (!lastActionTime || mode === TimeAgoModes.AbsoluteTime) {
      return false;
    }

    const timeDiff = Date.now() - Date.parse(lastActionTime);
    const timeInMinutes = Math.round(timeDiff / MINUTE);

    return timeInMinutes < 10;
  },
  [lastActionTime, mode]);

  return (
    <>
      {(lastActionTime && !isUserOnline)
        ? (
          <TimeAgo
            className={cn('c-gray', TimeAgoStyles.timeAgo, {
              [Selectors.Accent]: mode === TimeAgoModes.AbsoluteTime,
            })}
            datetime={lastActionTime}
            locale='en_US'
          />
        ) : (
          <div className={cn(
            TimeAgoStyles.onlineStatus,
            typography.smallCaption,
          )}
          >
            <div>
              {t(`${Namespaces.Profile}:profile_online_status`)}
            </div>
          </div>
        )}
    </>
  );
};
