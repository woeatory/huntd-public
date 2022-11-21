import { connectOAuthProviderResolver } from '@/modules/oauth/oauth.resolvers/connectOAuthProvider.resolver';
import { disconnectOAuthProviderResolver } from '@/modules/oauth/oauth.resolvers/disconnectOAuthProvider.resolver';
import { usersOAuthProvidersResolver } from '@/modules/oauth/oauth.resolvers/usersOAuthProviders.resolver';

export const OAuthResolvers = {
  Mutation: {
    connectOAuthProvider: connectOAuthProviderResolver,
    disconnectOAuthProvider: disconnectOAuthProviderResolver,
  },
  Query: {
    usersOAuthProviders: usersOAuthProvidersResolver,
  },
};
