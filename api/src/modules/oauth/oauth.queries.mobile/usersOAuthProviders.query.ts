import gql from 'graphql-tag';

export const USERS_OAUTH_PROVIDERS_QUERY = gql`
  query usersOAuthProviders {
    usersOAuthProviders {
      id
      providerId
      providerName
      token
    }
  }
`;
