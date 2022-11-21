import {
  ApolloClient,
  InMemoryCache, NormalizedCacheObject,
} from '@apollo/client';
import {
  cmsGraphqlPath,
  getCmsClientHeaders,
} from '@/controllers/graphql/cms/cms.graphqlUtils';

let client: ApolloClient<NormalizedCacheObject> | null = null;

export const initApolloClient = () => {
  if (!client) {
    client = new ApolloClient({
      uri: cmsGraphqlPath,
      cache: new InMemoryCache(),
      headers: getCmsClientHeaders(),
    });
  }

  return client;
};
