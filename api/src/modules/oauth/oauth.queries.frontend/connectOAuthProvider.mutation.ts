import gql from 'graphql-tag';

export const CONNECT_OAUTH_PROVIDER_MUTATION = gql`
  mutation connectOAuthProvider(
    $provider: OAuthProviders!,
    $token: String!,
    $id: String!
  ) {
    connectOAuthProvider(
      provider: $provider
      token: $token
      id: $id
    )
  }
`;
