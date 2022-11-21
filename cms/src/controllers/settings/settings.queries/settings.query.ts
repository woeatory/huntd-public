import { gql } from '@apollo/client';

export const SETTINGS_QUERY = gql`
  query settings {
    setting {
      id
      api_graphql_endpoint
      api_graphql_token
    }
  }
`;
