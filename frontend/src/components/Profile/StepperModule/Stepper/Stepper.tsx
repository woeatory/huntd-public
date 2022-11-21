import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import { Selectors } from '@/lib/selectors';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { CandidateProfileTabs } from '@/controllers/candidateProfile/candidateProfile.typedefs';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './Stepper.module.scss';

interface Props {
  currentStep: number;
  isFirstTimeFillingProfile: boolean;
}

export const Stepper = memo((props: Props) => {
  const { currentStep, isFirstTimeFillingProfile } = props;

  const workPlacesFeature = useFeature(Features.WorkPlaces);
  const nftFeature = useFeature(Features.NftAvatars);

  let stepsAmount = nftFeature.isEnabled()
    ? Object.keys(CandidateProfileTabs).length + 1
    : Object.keys(CandidateProfileTabs).length;

  if (isFirstTimeFillingProfile) {
    stepsAmount -= 1;
  }

  const { t } = useTranslation([Namespaces.Profile]);

  const gradientWidth = useMemo(
    () => (100 / (stepsAmount - 1)) * (currentStep - 1),
    [currentStep, stepsAmount],
  );

  return (
    <>
      <div
        className={cn(
          styles.circlesLine,
          styles.circlesLine_gradient,
          Selectors.Active,
        )}
        style={{ width: `${gradientWidth}%` }}
      />
      <div
        className={cn(styles.circlesLine, styles.circlesLine_white)}
        style={{ width: `${100 - gradientWidth}%` }}
      />
      <div className={cn(styles.circlesWrapper)}>
        {Object.values(CandidateProfileTabs).map((slug, i) => (
          <React.Fragment key={slug}>
            {(!workPlacesFeature.isEnabled()
              && slug === CandidateProfileTabs.Bio
            ) || (isFirstTimeFillingProfile
              && slug === CandidateProfileTabs.Contacts
            )
              ? null
              : (
                <div
                  key={slug}
                  className={cn(
                    styles.circle,
                    {
                      [styles.circle_passed]: i < currentStep - 1,
                      [Selectors.Active]: i === currentStep - 1,
                    },
                  )}
                >
                  <div className={styles.checkMarkIconContainer}>
                    <IconCheck />
                  </div>
                  <div className={cn(
                    styles.circleName,
                    {
                      [styles.circleName_passed]: i < currentStep - 1,
                      [Selectors.Active]: i === currentStep - 1,
                    },
                  )}
                  >
                    {t(`${Namespaces.Profile}:profile_tab_${slug}`)}
                  </div>
                </div>
              )}
          </React.Fragment>
        ))}
        {nftFeature.isEnabled() && (
          <div className={styles.substrate}>
            <div className={styles.hexagon} />
          </div>
        )}

      </div>
    </>
  );
});
