import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Features } from '@/controllers/features/features.constants';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { WorkPlaceCompanyInfo } from './WorkPlaceCompanyInfo';
import styles from './ProfileWorkHistory.module.scss';

export interface WorkPlaceContent {
  title: string;
  startDate?: string;
  endDate?: string | null;
  description?: string | null;
  duration: string;
  workPlaceDate: string;
  companyInfo: CompanyInfo;
}

export interface CompanyInfo {
  companySize?: string | null;
  companySpecializations?: string[] | null;
  companyFundingType?: string | null;
}

export interface ProfileWorkplace {
  companyName: string;
  content: WorkPlaceContent[];
}

interface Props {
  workPlaces: ProfileWorkplace[]
  areContactsHidden?: boolean
}
export const ProfileWorkHistory = React.memo<Props>((props) => {
  const { workPlaces, areContactsHidden } = props;
  const { t } = useTranslation([Namespaces.Profile]);
  const companyInfoFeature = useFeature(Features.CompanyInfo);

  const shouldCompanyInfoRender = (workPlace: WorkPlaceContent) => {
    const {
      companySpecializations,
      companySize,
      companyFundingType,
    } = workPlace.companyInfo;

    return companyInfoFeature.isEnabled() && (
      companySpecializations || companySize || companyFundingType
    );
  };

  return (
    <>
      <p className={cn(typography.caption, 'c-semidark-chocolate mb-8')}>
        {t(`${Namespaces.Profile}:experience_title`)}
      </p>
      <ul>
        {workPlaces.map((item) => (
          <li key={item.companyName} className={styles.item}>
            {item.content.map((workPlace) => (
              <div className={cn(styles.item, 'c-semidark-chocolate')} key={workPlace.title}>
                <div className={styles.workPlaceContainer}>
                  <div className={cn(styles.workPlaceInfo)}>
                    <p className={cn(typography.caption, 'mb-4')}>{workPlace.title}</p>
                    {!areContactsHidden && (
                      <p className={cn(typography.smallText, 'mb-8')}>
                        {item.companyName}
                      </p>
                    )}
                    <div className={cn(
                      styles.termsContainer,
                      typography.smallText,
                    )}
                    >
                      <span className={cn(styles.term, 'mr-12')}>{workPlace.workPlaceDate}</span>
                      <span className={styles.redDot} />
                      <span className={styles.term}>{workPlace.duration}</span>
                    </div>
                  </div>
                  {shouldCompanyInfoRender(workPlace) && (
                    <WorkPlaceCompanyInfo companyInfo={workPlace.companyInfo} />
                  )}
                </div>

                {workPlace.description && !areContactsHidden && (
                  <p
                    className={cn(
                      typography.smallText,
                      styles.descriptionField,
                    )}
                  >
                    {workPlace.description}
                  </p>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>

  );
});
