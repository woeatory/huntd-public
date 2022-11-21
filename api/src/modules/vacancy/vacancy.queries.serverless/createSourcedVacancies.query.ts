import gql from 'graphql-tag';

export const CREATE_SOURCED_VACANCIES_MUTATION = gql`
  mutation createSourcedVacancies($vacancies: [SourcedVacancy!]) {
    createSourcedVacancies(vacancies: $vacancies)
  }
`;
