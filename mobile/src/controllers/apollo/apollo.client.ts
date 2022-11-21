import { setContext } from '@apollo/client/link/context';
import { asyncMap, getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloClient, InMemoryCache, createHttpLink, ApolloLink, split,
} from '@apollo/client';
import setCookieParse from 'set-cookie-parser';
import { WebSocketLink } from '@apollo/client/link/ws';
import Config from 'react-native-config';
import { COOKIES_HEADER_NAME, ACCESS_TOKEN_HEADER } from '@/controllers/auth/auth.constants';
import { ClientStorage } from '@/controllers/storage/Storage.client';

export const initApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${Config.API_ENDPOINT}/graphql`,
  });

  const wsLink = new WebSocketLink({
    uri: `${Config.WS_API_ENDPOINT}/graphql-ws`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        const accessToken = await ClientStorage.getItem(ACCESS_TOKEN_HEADER);

        return {
          [ACCESS_TOKEN_HEADER]: accessToken,
        };
      },
    },
  });

  const authMiddleware = setContext(async (request, { headers }) => {
    const accessToken = await ClientStorage.getItem(ACCESS_TOKEN_HEADER);

    return {
      headers: {
        ...headers,
        [ACCESS_TOKEN_HEADER]: accessToken,
      },
    };
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    if (!forward) {
      return null;
    }

    return asyncMap(forward(operation), async (response) => {
      const context = operation.getContext();
      const { response: { headers } } = context;

      if (headers) {
        const cookiesHeader = headers.get(COOKIES_HEADER_NAME);
        const cookies = setCookieParse.parse(cookiesHeader, { map: true });

        const accessToken = cookies[ACCESS_TOKEN_HEADER];

        if (accessToken) {
          if (accessToken.value) {
            await ClientStorage.setItem(ACCESS_TOKEN_HEADER, accessToken.value);
          } else {
            await ClientStorage.removeItem(ACCESS_TOKEN_HEADER);
          }
        }
      }

      return response;
    });
  });

  const apolloLink = ApolloLink.from([
    authMiddleware,
    afterwareLink,
    httpLink,
  ]);

  const link = wsLink
    ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription';
      },
      wsLink,
      apolloLink,
    ) : apolloLink;

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    credentials: 'include',
  });
};
