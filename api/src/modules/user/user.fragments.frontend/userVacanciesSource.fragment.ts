import gql from 'graphql-tag';

export const USER_HAS_VACANCIES_SOURCE_FRAGMENT = gql`
  fragment UserHasVacanciesSource on User {
    hasVacanciesSource
  }
`;
