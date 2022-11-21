import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export type ReadyApolloClient = ApolloClient<NormalizedCacheObject>;
export type ApolloInitialState = NormalizedCacheObject | null;

interface Ctx {
  cache: InMemoryCache
}
export interface ResolverFn<A, R, P = unknown> {
  (parent: P, args: A, ctx: Ctx): Promise<R>
}
