import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Image } from '@/components/Base/Image/Image';
import { HOMEPAGE_VACANCIES } from './constants';
import styles from './HomepageGlobeBlock.module.scss';

export const GlobeVacancies = () => {
  const { t } = useTranslation(Namespaces.Home);

  return (
    <div className={styles.vacanciesContainer}>
      {HOMEPAGE_VACANCIES.map((vacancy) => (
        <div
          className={styles.vacancy}
          key={vacancy.id}
        >
          <div className={cn(styles.vacancyLogo)}>
            <Image
              priority
              src={process.env.NODE_ENV === 'production' ? vacancy.logoUrl : vacancy.logoDevUrl}
              width={64}
              height={64}
            />
          </div>
          <div className={styles.vacancyInfo}>
            <span className={cn(styles.companyName)}>
              {t(vacancy.companyTitle)}
            </span>
            <span className={cn(styles.vacancyTitle)}>
              {t(vacancy.jobTitle)}
            </span>
            <div className={cn(styles.vacancyParameters)}>
              <span className={styles.vacancyParameter}>
                {t(vacancy.salary)}
              </span>
              <span className={styles.vacancyParameter}>
                {t(vacancy.location)}
              </span>
            </div>
          </div>
        </div>

      ))}
    </div>
  );
};
