import { makeAuthResolver } from '@/core';
import {
  UsersOAuthProvidersUseCase,
  UsersOAuthProvidersOptions, UsersOAuthProvidersResult,
} from '@/modules/oauth/oauth.useCases/UsersOAuthProviders.useCase';

export const usersOAuthProvidersResolver = makeAuthResolver<
  UsersOAuthProvidersOptions,
  UsersOAuthProvidersResult
>(
  UsersOAuthProvidersUseCase,
);
