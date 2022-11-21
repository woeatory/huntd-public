import React, { FC } from 'react';
import { VacancyMeta } from '@/components/Vacancies/VacancyMeta/VacancyMeta';
import { VacancyInfo } from '@/components/Vacancies/VacancyInfo/VacancyInfo';
import { Vacancy } from '@/controllers/graphql/generated';
import { UseVacancyInfoItems } from '@/controllers/vacancy/vacancy.hooks/useVacancyInfoItems';
import { UseVacancyMetaItems } from '@/controllers/vacancy/vacancy.hooks/useVacancyMetaItems';
import { AppliedVacanciesStorage } from '@/controllers/vacancy/vacancy.typedefs';
import styles from './VacancyDetailed.module.scss';

interface Props {
  vacancy: Vacancy;
  callback: () => Promise<any>;
  appliedVacancies: AppliedVacanciesStorage;
}

export const VacancyDetailed: FC<Props> = (props) => {
  const {
    vacancy,
    callback,
    appliedVacancies,
  } = props;

  const vacancyInfoItems = UseVacancyInfoItems(vacancy);
  const vacancyMetaItems = UseVacancyMetaItems(vacancy);

  return (
    <div className={styles.vacancyInfoWrapper}>
      <VacancyMeta items={vacancyMetaItems} />
      <VacancyInfo
        items={vacancyInfoItems}
        callback={callback}
        appliedVacancies={appliedVacancies}
        vacancyId={vacancy.id}
        sourceId={vacancy.sourceId}
      />
    </div>
  );
};
