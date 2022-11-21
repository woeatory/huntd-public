import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Router } from '@/controllers/i18n/i18n.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { CandidateProfileTabs } from '@/controllers/candidateProfile/candidateProfile.typedefs';
import { Selectors } from '@/lib/selectors';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './Tabs.module.scss';

interface Props {
  currentStep: number;
}

export const Tabs = memo((props: Props) => {
  const { currentStep } = props;

  const workPlacesFeature = useFeature(Features.WorkPlaces);

  const { t } = useTranslation([Namespaces.Profile]);

  const handlePush = useCallback(async (tab) => {
    await Router.push(`/profile/candidate/${tab}`);
  },
  []);

  return (
    <>
      <div className={cn(styles.tabsWrapper)}>
        {Object.values(CandidateProfileTabs).map((tab, i) => (
          <React.Fragment key={tab}>
            {!workPlacesFeature.isEnabled() && (
              tab === CandidateProfileTabs.Bio
            )
              ? null
              : (
                <button
                  key={tab}
                  onClick={() => handlePush(tab)}
                  className={cn(
                    styles.tab, {
                      [Selectors.Active]: i === currentStep - 1,
                    },
                  )}
                >
                  <div className={cn(
                    styles.tabName, {
                      [Selectors.Active]: i === currentStep - 1,
                    },
                  )}
                  >
                    {t(`${Namespaces.Profile}:profile_tab_${tab}`)}
                  </div>
                </button>
              )}
          </React.Fragment>
        ))}
      </div>
      <div className={cn(styles.tabsLine)} />
    </>
  );
});
