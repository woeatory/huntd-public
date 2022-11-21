import gql from 'graphql-tag';
import { VACANCY_FULL_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyFull.fragment';

export const VACANCIES_BY_COMPANY_QUERY = gql`
  query vacanciesByCompany($options: VacanciesByCompanyParameters) {
    vacanciesByCompany(options: $options) {
      ...VacancyFull
    }
  }
  ${VACANCY_FULL_FRAGMENT}
`;
