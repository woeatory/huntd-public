import React, { FC, memo } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ActiveNavLink } from '@/components/Base/ActiveNavLink';
import { HiringManagementRoutes, RecruiterProfileRoutes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Selectors } from '@/lib/selectors';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { RecruiterProfileNavigationModes } from '@/controllers/recruiterProfile/recruiterProfile.typedefs';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import styles from './RecruiterProfileNavigation.module.scss';

interface Props {
  mode: RecruiterProfileNavigationModes,
}

export const RecruiterProfileNavigation: FC<Props> = memo(({ mode }) => {
  const { t } = useTranslation([Namespaces.Profile]);
  const hiringsFeature = useFeature(Features.RecruiterHirings);
  const { query } = useRouter();
  const [user] = useAuthUser();

  const isFirstTimeFillingProfile = (
    user?.isFirstTimeFillingRecruiterProfile ?? false
  );

  const getShouldLinkBeRendered = (slug: string) => {
    const shouldContactsBeVisible = isFirstTimeFillingProfile
      && slug === RecruiterProfileRoutes.Contacts;

    const shouldHiringFeatureLinksBeVisible = !hiringsFeature.isEnabled()
      && (slug === HiringManagementRoutes.Hirings
        || slug === HiringManagementRoutes.Connections);

    return shouldContactsBeVisible || shouldHiringFeatureLinksBeVisible;
  };

  const routes = mode === RecruiterProfileNavigationModes.HiringManagement
    ? HiringManagementRoutes
    : RecruiterProfileRoutes;

  return (
    <div className="grid-container mt-40">
      <div className="grid-x grid-margin-x">
        <div className="cell large-offset-3 large-9">
          <nav className={styles.navigationWrapper}>
            {Object.entries(routes).map(([key, slug]) => (
              <React.Fragment key={key}>
                {getShouldLinkBeRendered(slug)
                  ? null
                  : (
                    <ActiveNavLink href={slug}>
                      <a className={cn(styles.navLink, {
                        [Selectors.Active]: Object.values(
                          routes,
                        ).includes(query.tab as RecruiterProfileRoutes),
                      })}
                      >
                        {t(`${Namespaces.Profile}:recruiter_profile_${key.toLowerCase()}_tab`)}
                      </a>
                    </ActiveNavLink>
                  )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
});
