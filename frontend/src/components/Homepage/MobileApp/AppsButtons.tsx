import React, {
  DetailedHTMLProps, FC, HTMLAttributes,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { MobileAppsRoutes } from '@/controllers/router/router.constants';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './MobileApp.module.scss';

interface Options {
  buttonsClassName?: string;
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & Options

export const AppButtons: FC<Props> = ({ className, buttonsClassName }) => {
  const { pathname } = useRouter();

  return (
    <>
      <div className={cn(styles.storeButtonsContainer, className)}>
        <a
          onClick={() => analytics.sendEvent(
            analytics.events.appDownloadClicks.AppStoreClicked,
            { pathname },
          )}
          href={MobileAppsRoutes.Apple}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/app-store.png"
            alt="download on the app store"
            className={cn(styles.storeButton, buttonsClassName)}
            loading="lazy"
          />
        </a>

        <a
          onClick={() => analytics.sendEvent(
            analytics.events.appDownloadClicks.GooglePlayClicked,
            { pathname },
          )}
          href={MobileAppsRoutes.Google}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/google-play.png"
            alt="download on the google play"
            className={cn(styles.storeButton, buttonsClassName)}
            loading="lazy"
          />
        </a>
      </div>
    </>
  );
};
