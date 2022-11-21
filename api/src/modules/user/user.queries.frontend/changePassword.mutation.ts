import gql from 'graphql-tag';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword(
    $currentPassword: String!,
    $password: String!,
    $repeatPassword: String!
    ) {
    changePassword(
      currentPassword: $currentPassword
      password: $password
      repeatPassword: $repeatPassword
    )
  }
`;
