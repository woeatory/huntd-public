import gql from 'graphql-tag';
import { VACANCIES_SOURCE_BASE_FRAGMENT } from '@/modules/vacanciesSource/vacanciesSource.fragments.serverless/vacaniesSourceBase.fragment';

export const VACANCIES_SOURCES_QUERY = gql`
  query vacanciesSources {
    vacanciesSources {
      ...VacanciesSourceBase
    }
  }
  ${VACANCIES_SOURCE_BASE_FRAGMENT}
`;
