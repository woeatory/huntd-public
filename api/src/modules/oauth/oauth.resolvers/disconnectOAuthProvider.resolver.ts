import { makeAuthResolver } from '@/core';
import {
  DisconnectOAuthProviderUseCase,
  DisconnectOAuthProviderUseCaseOptions, DisconnectOAuthProviderUseCaseResult,
} from '@/modules/oauth/oauth.useCases/DisconnectOAuthProvider.useCase';

export const disconnectOAuthProviderResolver = makeAuthResolver<
  DisconnectOAuthProviderUseCaseOptions,
  DisconnectOAuthProviderUseCaseResult
>(
  DisconnectOAuthProviderUseCase,
);
