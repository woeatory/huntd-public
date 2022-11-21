import React, { FC } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CompanyInfo } from '@/components/Profile/ProfileWorkHistory/ProfileWorkHistory';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import styles from './ProfileWorkHistory.module.scss';

interface Props {
  companyInfo: CompanyInfo
}

export const WorkPlaceCompanyInfo: FC<Props> = (({ companyInfo }) => {
  const {
    companySize,
    companySpecializations,
    companyFundingType,
  } = companyInfo;

  const companyInfoTagsFeature = useFeature(Features.CompanyInfoTags);

  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <div className={styles.divider} />
      <div>
        <div className={styles.companyInfoWrapper}>
          {companySize && (
            <div className="mr-40 small-mt-8">
              <span className={typography.smallText}>
                {t(`${Namespaces.Profile}:workplace_company_size`)}
              </span>
              <p className={typography.smallCaption}>
                {companySize}
              </p>
            </div>
          )}

          {companyFundingType && (
            <div className="small-mt-8">
              <span className={typography.smallText}>
                {t(`${Namespaces.Profile}:workplace_company_funding_type`)}
              </span>
              <p className={typography.smallCaption}>
                {companySize}
              </p>
            </div>
          )}
        </div>
        {(companySpecializations && companyInfoTagsFeature.isEnabled()) && (
          <div className={cn(styles.tagsContainer, 'small-mt-16')}>
            {companySpecializations.map((spec: string) => (
              <div
                className={cn(styles.companyInfoTag)}
                key={spec}
              >
                {spec}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
});
