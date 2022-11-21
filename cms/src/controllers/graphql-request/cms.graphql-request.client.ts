import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { getSdk } from '@/controllers/graphql/cms/cms.request.generated';
import {
  cmsGraphqlPath,
  getCmsClientHeaders,
} from '@/controllers/graphql/cms/cms.graphqlUtils';

export const cmsGraphqlRequestClient = (options?: RequestInit) => {
  const client = new GraphQLClient(cmsGraphqlPath, {
    ...options,
    headers: getCmsClientHeaders(),
  });

  return getSdk(client);
};
