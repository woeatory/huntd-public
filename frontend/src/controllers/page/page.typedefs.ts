import { NextPageContext } from 'next';
import {
  ApolloInitialState,
  ReadyApolloClient,
} from '@/controllers/apollo/apollo.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

export interface PageContext extends NextPageContext {
  apolloClient?: ReadyApolloClient;
  apolloState?: ApolloInitialState
}

export interface PageProps {
  apolloState?: ApolloInitialState;
  apolloClient?: ReadyApolloClient;
  namespacesRequired?: Array<Namespaces>
}

export interface GetInitialProps {
  (ctx: PageContext): Promise<PageProps>
}
