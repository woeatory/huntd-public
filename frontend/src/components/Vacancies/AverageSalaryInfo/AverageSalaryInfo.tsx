import React, { FC } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconCurvedArrowLeft } from '@/ui/icons/general/IconCurvedArrowLeft';
import { formatCategory } from '@/components/Vacancies';
import styles from './AverageSalaryInfo.module.scss';

interface SalaryData {
  maxSalary: number;
  averageMinSalary: number;
  averageSalary: number;
}

interface Props {
  category?: string;
  salaryData?: SalaryData;
}

const formatNumber = (number = 0) => Math.ceil(number / 1000).toFixed(0);

export const AverageSalaryInfo: FC<Props> = ({ category, salaryData }) => {
  const { t } = useTranslation([Namespaces.Vacancy]);

  const categoryTitle = formatCategory(category);

  const { averageMinSalary, maxSalary, averageSalary } = salaryData ?? {};

  return (
    <div className={cn('grid-container mt-64', styles.wrapper)}>
      <div className={styles.salaryBlock}>
        <p className={cn(typography.overhead, 'mb-16')}>
          {t(`${Namespaces.Vacancy}:average_yearly_salary`)}
        </p>
        <h2 className={cn(typography.h2, 'mb-24')}>
          {t(`${Namespaces.Vacancy}:average_yearly_salary_question`, { role: categoryTitle })}
        </h2>
        <p className={cn(styles.underhead, 'c-semidark-chocolate')}>
          {t(`${Namespaces.Vacancy}:average_yearly_salary_answer`, {
            role: categoryTitle,
            averageSalary: formatNumber(averageSalary),
            minSalary: formatNumber(averageMinSalary),
            maxSalary: formatNumber(maxSalary),
          })}
        </p>
      </div>

      <div className={styles.arrowIcon}>
        <IconCurvedArrowLeft />
      </div>
    </div>
  );
};
