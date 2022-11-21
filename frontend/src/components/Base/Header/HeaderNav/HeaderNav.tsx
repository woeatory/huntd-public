import React, { FC } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { ActiveNavLink } from '@/components/Base/ActiveNavLink';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Routes } from '@/controllers/router/router.constants';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconArrowRotate } from '@/ui/icons/general/IconArrowRotate';
import { communityLinks } from '@/components/Base/SocialLink/SocialLink.constants';
import { Tooltip } from '@/components/Base/Tooltip';
import { analytics } from '@/controllers/analytics/analytics.client';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './HeaderNav.module.scss';

const HeaderChatsLink = dynamic<Record<string, any>>(
  async () => {
    const mod = await import('@/components/ChatsModule/HeaderChatsLink/HeaderChatsLink');

    return mod.HeaderChatsLink;
  },
  {
    ssr: false,
  },
);

interface Props {
  renderSwitch?: (className: string) => JSX.Element
  shouldSwitchBeRendered?: boolean
  shouldNavLinksBeVisible: boolean
}

export const HeaderNav: FC<Props> = ({
  renderSwitch,
  shouldSwitchBeRendered,
  shouldNavLinksBeVisible,
}) => {
  const [user] = useAuthUser();
  const { t } = useTranslation([Namespaces.Common]);

  const communityLinkFeature = useFeature(Features.CommunityLink);

  return (
    <nav className={styles.nav}>
      {shouldSwitchBeRendered && renderSwitch
        ? renderSwitch(styles.switcher)
        : communityLinkFeature.isEnabled() && (
          <div className={styles.communityLinkContainer}>

            <Tooltip
              text={t(`${Namespaces.Common}:community_tooltip_text`)}
              position={TooltipPositions.Bottom}
              renderIcon={() => (
                <a
                  onClick={() => analytics.sendEvent(
                    analytics.events.pageInteraction.communityButtonClicked,
                    {},
                  )}
                  href={communityLinks.Telegram}
                  className={cn(styles.communityLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`${Namespaces.Common}:community`)}
                  <IconArrowRotate />
                </a>
              )}
            />
          </div>
        )}

      {shouldNavLinksBeVisible && (
        <>
          <div className={styles.desktopLinks}>
            <ActiveNavLink href={Routes.Candidates}>
              <a className={cn(styles.navLink)}>
                {t(`${Namespaces.Common}:candidates_link`)}
              </a>
            </ActiveNavLink>
            <ActiveNavLink href={Routes.Vacancies}>
              <a className={styles.navLink}>
                {t(`${Namespaces.Common}:vacancies_page_title`)}
              </a>
            </ActiveNavLink>
          </div>

          {user && (
            <HeaderChatsLink />
          )}
        </>
      )}
    </nav>
  );
};
