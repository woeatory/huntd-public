import { IncomingHttpHeaders } from 'http';
import {
  ApolloClient, InMemoryCache, ApolloLink, split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { getApiLink } from '@/lib/getApiLink';
import {
  ApolloInitialState,
  ReadyApolloClient,
} from '@/controllers/apollo/apollo.typedefs';
import { PageContext } from '@/controllers/page/page.typedefs';
import { LOGIN_NOT_AUTHORIZED } from '@/controllers/apollo/apollo.constants';
import { Router } from '@/controllers/i18n/i18n.client';
import { createLogger } from '@/controllers/logger/logger.client';
import { resolvers } from '@/controllers/apollo/apollo.localStore/modules/resolvers';
import { schemas } from '@/controllers/apollo/apollo.localStore/modules/schemas';
import { setInitialState } from '@/controllers/apollo/apollo.setInitialState';
import { isBrowser } from '@/lib/isBrowser';
import { getApiWsLink } from '@/lib/getApiWsLink';
import { PublicCandidateProfilesTypePolicies } from '@/controllers/candidateProfile/candidateProfile.typepolicies';
import { VacanciesTypePolicies } from '@/controllers/vacancy/vacancy.typepolicies';

let apolloClient: ReadyApolloClient;

interface CreateApolloClient {
  (headers?: IncomingHttpHeaders): ReadyApolloClient
}
const createApolloClient: CreateApolloClient = (headers) => {
  const logger = createLogger({
    name: 'Apollo Client',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, path }) => {
        logger.warning('[GRAPHQL ERROR]', {
          Message: message,
          Path: path?.join(' -> '),
        });

        if (
          typeof window !== 'undefined'
          && message.includes(LOGIN_NOT_AUTHORIZED)
        ) {
          Router.replace('/sign-in');
        }
      });
    }

    if (networkError) {
      logger.warning('[NETWORK ERROR]', {
        Message: networkError.message,
        Stack: networkError.stack,
      });
    }
  });

  const uploadLink = createUploadLink({
    uri: getApiLink(),
    credentials: 'include',
    headers: headers as Record<string, string>,
  });

  const apiLink = ApolloLink.from([
    errorLink,
    uploadLink,
  ]);

  const wsLink = isBrowser
    ? new WebSocketLink({
      uri: getApiWsLink(),
      options: {
        reconnect: true,
        lazy: true,
        inactivityTimeout: 10000,
      },
    })
    : null;

  const link = isBrowser && wsLink
    ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      apiLink,
    )
    : apiLink;

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ...PublicCandidateProfilesTypePolicies,
          ...VacanciesTypePolicies,
        },
      },
    },
  });

  setInitialState(cache);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
    resolvers,
    typeDefs: schemas,
  });
};

export interface InitApollo {
  (props: {
    initialState?: ApolloInitialState,
    headers?: IncomingHttpHeaders,
  }): ReadyApolloClient
}
export const initApollo: InitApollo = ({ initialState, headers } = {}) => {
  const client = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    client.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  if (!apolloClient) {
    apolloClient = client;
  }

  return apolloClient;
};

export interface InitApolloInContext {
  (props: {
    ctx: PageContext,
    headers: IncomingHttpHeaders
  }): ReadyApolloClient
}
export const initApolloInContext: InitApolloInContext = ({ ctx, headers }) => {
  const client = ctx.apolloClient ?? initApollo({
    initialState: ctx.apolloState, headers,
  });

  Object.assign(client, { toJSON: () => null });
  Object.assign(ctx, { apolloClient: client });

  return client;
};
