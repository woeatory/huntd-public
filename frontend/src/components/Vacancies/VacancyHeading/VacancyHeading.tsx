import React from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import typography from '@/ui/typography/typography.module.scss';
import styles from './VacancyHeading.module.scss';

export const VacancyHeading = () => {
  const { t } = useTranslation([Namespaces.Vacancy]);

  return (
    <ul className={cn(
      typography.overhead,
      styles.heading,
      'cell mb-8',
    )}
    >
      <li className={styles.company}>
        {t(`${Namespaces.Vacancy}:company_and_position_title`)}
      </li>
      <li className={styles.details}>
        {t(`${Namespaces.Vacancy}:job_details_title`)}
      </li>
      <li className={styles.status}>
        {t(`${Namespaces.Vacancy}:status_title`)}
      </li>
    </ul>

  );
};
