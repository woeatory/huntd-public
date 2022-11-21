import React, { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Routes } from '@/controllers/router/router.constants';
import { FOOTER_SEO_JOBS_VALUES } from '@/components/Base/Footer/Footer.constants';
import styles from './VacanciesNav.module.scss';

interface Props {
  isSalariesPage?: boolean;
}

export const VacanciesNav: FC<Props> = ({ isSalariesPage }) => {
  const route = isSalariesPage ? Routes.Salaries : Routes.Vacancies;

  return (
    <div className={cn('cell mb-16', styles.container)}>
      {FOOTER_SEO_JOBS_VALUES.map((value) => (
        <div key={value.title} className={styles.tag}>
          <Link href={`${route}/${value.route}`}>
            <a className={styles.link}>
              {value.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};
