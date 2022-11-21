import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/Vacancies/WrongVacanciesCategory/WrongVacanciesCategory.module.scss';

export const WrongVacanciesCategory = () => {
  const { t } = useTranslation([Namespaces.Vacancy]);

  return (
    <div className='grid-container mt-60'>
      <div className="grid-x grid-margin-x mb-60 c-semidark-chocolate">
        <h1 className={cn('cell large-8 large-offset-2', typography.h2, styles.heading)}>
          {t(`${Namespaces.Vacancy}:wrong_vacancies_category`)}
        </h1>
      </div>
    </div>
  );
};
