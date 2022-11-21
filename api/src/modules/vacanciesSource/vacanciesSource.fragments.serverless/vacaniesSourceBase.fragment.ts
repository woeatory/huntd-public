import gql from 'graphql-tag';

export const VACANCIES_SOURCE_BASE_FRAGMENT = gql`
  fragment VacanciesSourceBase on VacanciesSource {
    id
    userId
    url
  }
`;
