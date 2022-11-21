import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $token: String!,
    $password: String!,
    $repeatPassword: String!
    ) {
    resetPassword(
      token: $token
      password: $password
      repeatPassword: $repeatPassword
    )
  }
`;
