import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@/controllers/graphql/api/api.request.generated';
import { getSettings } from '@/controllers/settings/settings.getSettings';

export const apiGraphqlRequestClient = async (options?: RequestInit) => {
  const settings = await getSettings();

  const path = strapi.env === 'development'
    ? API_GRAPHQL_ENDPOINT_LOCAL
    : settings.api_graphql_endpoint;

  const token = strapi.env === 'development'
    ? API_GRAPHQL_TOKEN
    : settings.api_graphql_token;

  const client = new GraphQLClient(path, {
    headers: {
      'x-service-token': token,
    },
    ...options,
  });

  return getSdk(client);
};
