import { makeAuthResolver } from '@/core';
import {
  ConnectOAuthProviderUseCase,
  ConnectOAuthProviderUseCaseOptions,
  ConnectOAuthProviderUseCaseResult,
} from '@/modules/oauth/oauth.useCases/ConnectOAuthProvider.useCase';

export const connectOAuthProviderResolver = makeAuthResolver<
  ConnectOAuthProviderUseCaseOptions,
  ConnectOAuthProviderUseCaseResult
>(
  ConnectOAuthProviderUseCase,
);
