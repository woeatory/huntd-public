import gql from 'graphql-tag';

export const ADD_VACANCIES_LOGO_MUTATION = gql`
  mutation addVacanciesLogo($companyNames: [String!]) {
    addVacanciesLogo(companyNames: $companyNames)
  }
`;
