import gql from 'graphql-tag';

export const SEND_NEW_VACANCY_APPLICATION_MUTATION = gql`
  mutation sendNewVacancyApplication(
    $companyName: String!
    $jobTitle: String!
  ) {
    sendNewVacancyApplication(
      companyName: $companyName
      jobTitle: $jobTitle
    )
  }
`;
