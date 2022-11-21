import gql from 'graphql-tag';
import { VACANCIES_SOURCE_BASE_FRAGMENT } from '@/modules/vacanciesSource/vacanciesSource.fragments.frontend/vacaniesSourceBase.fragment';

export const CREATE_VACANCIES_SOURCE_MUTATION = gql`
  mutation createVacanciesSource(
    $atsId: String!
    $type: VacancySourceType!
  ) {
    createVacanciesSource(
      atsId: $atsId,
      type: $type,
    ) {
      ...VacanciesSourceBase
    }
  }
  ${VACANCIES_SOURCE_BASE_FRAGMENT}
`;
