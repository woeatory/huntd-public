import gql from 'graphql-tag';

export const DISCONNECT_OAUTH_PROVIDER_MUTATION = gql`
  mutation disconnectOAuthProvider($provider: OAuthProviders!) {
    disconnectOAuthProvider(provider: $provider)
  }
`;
