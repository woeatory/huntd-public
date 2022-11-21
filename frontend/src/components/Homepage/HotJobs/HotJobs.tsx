import React, { useMemo, useCallback } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useHotVacanciesQuery, Vacancy } from '@/controllers/graphql/generated';
import { HotJobCard } from '@/components/Homepage/HotJobs/HotJobCard';
import { Routes } from '@/controllers/router/router.constants';
import { IconCurvedArrowLeft } from '@/ui/icons/general/IconCurvedArrowLeft';

import styles from './HotJobs.module.scss';

export const HotJobs = () => {
  const { data } = useHotVacanciesQuery();
  const { t } = useTranslation([Namespaces.Home]);
  const router = useRouter();

  const hotVacancies = useMemo(() => data?.hotVacancies ?? [], [data]);

  const handleDetailsClick = useCallback(async (vacancy: Vacancy) => {
    analytics.sendEvent(
      analytics.events.vacancies.VacancyDetailsClicked,
      {
        vacancyId: vacancy.id,
        jobTitle: vacancy.jobTitle,
        companyName: vacancy.companyName,
      },
    );

    await router.push(`${Routes.Vacancies}#${vacancy.id}`);
  }, [router]);

  return (
    <>
      {hotVacancies.length > 0
        && (
        <>
          <div className={cn(styles.wrapper, 'grid-x grid-margin-x')}>
            <div className={cn(styles.fundedStartups, 'cell large-offset-3 large-6')}>
              <h2 className={cn(styles.title, 'mb-16')}>
                {t(`${Namespaces.Home}:funded_startups_title`)}
              </h2>
              <h3 className={styles.subtitle}>
                {t(`${Namespaces.Home}:funded_startups_subtitle`)}
              </h3>
            </div>

            <div className={styles.arrowIcon}>
              <IconCurvedArrowLeft />
            </div>
          </div>

          <div className={cn(styles.cardsWrapper, 'grid-x grid-margin-x c-semidark-chocolate')}>
            {hotVacancies.map((vacancy) => (
              <HotJobCard
                key={vacancy.id}
                vacancy={vacancy}
                handleDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        </>
        )}
    </>
  );
};
