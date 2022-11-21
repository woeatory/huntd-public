import gql from 'graphql-tag';

export const SEND_NEW_VACANCY_REQUEST_MUTATION = gql`
  mutation sendNewVacancyRequest(
    $vacancyLink: String!
    $contactEmail: String!
  ) {
    sendNewVacancyRequest(
      vacancyLink: $vacancyLink
      contactEmail: $contactEmail
    )
  }
`;
