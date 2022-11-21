import gql from 'graphql-tag';

export const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($token: String!) {
    confirmEmail(token: $token)
  }
`;
