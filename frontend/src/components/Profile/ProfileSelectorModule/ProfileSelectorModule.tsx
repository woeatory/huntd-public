import React, { useCallback } from 'react';
import { FancySelectorItem } from '@/components/Base/FancySelectorItem';
import { Link } from '@/controllers/i18n/i18n.client';
import { ProfileRoutes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import { PrimaryProfile } from '@/controllers/graphql/generated';

export const ProfileSelectorModule = () => {
  const { t } = useTranslation([Namespaces.ChooseProfile]);

  const sendProfileChosenEvent = useCallback(
    (profileType: PrimaryProfile) => {
      analytics.sendEvent(
        analytics.events.pageInteraction.ChooseProfileType,
        { profileType },
      );

      analytics.setUserProperties({
        primaryProfile: profileType,
      });
    }, [],
  );

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell large-6 large-offset-4">
          <Link href={ProfileRoutes.Candidate} passHref>
            <FancySelectorItem
              overhead={t(`${Namespaces.ChooseProfile}:candidate_profile_overhead`)}
              content={t(`${Namespaces.ChooseProfile}:candidate_profile_content`)}
              className="mb-32"
              onClick={() => sendProfileChosenEvent(PrimaryProfile.Candidate)}
            />
          </Link>

          <Link href={ProfileRoutes.Recruiter} passHref>
            <FancySelectorItem
              overhead={t(`${Namespaces.ChooseProfile}:recruiter_profile_overhead`)}
              content={t(`${Namespaces.ChooseProfile}:recruiter_profile_content`)}
              // profileType='recruiter'
              onClick={() => sendProfileChosenEvent(PrimaryProfile.Recruiter)}
            />
          </Link>
        </div>
      </div>
    </div>

  );
};
