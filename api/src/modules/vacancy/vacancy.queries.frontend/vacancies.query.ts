import gql from 'graphql-tag';
import { VACANCY_FULL_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyFull.fragment';

export const VACANCIES_QUERY = gql`
  query vacancies($options: VacanciesParameters, $offset: Int) {
    vacancies(options: $options, offset: $offset) {
      rows {
        ...VacancyFull
      }
      hasMore
    }
  }
  ${VACANCY_FULL_FRAGMENT}
`;
