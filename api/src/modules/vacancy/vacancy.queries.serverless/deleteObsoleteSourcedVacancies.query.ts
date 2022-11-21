import gql from 'graphql-tag';

export const DELETE_OBSOLETE_SOURCED_VACANCIES_MUTATION = gql`
  mutation deleteObsoleteSourcedVacancies {
    deleteObsoleteSourcedVacancies
  }
`;
