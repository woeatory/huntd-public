import { useCallback, useState } from 'react';
import { AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication';
import { useSocialLogin } from '@/controllers/oauth/oauth.hooks/useSocialLogin';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

interface UseAppleSignIn {
  (): [() => void, boolean]
}

export const useAppleSignIn: UseAppleSignIn = () => {
  const logger = useLogger({ name: 'Apple Sign In' });
  const [socialLogin] = useSocialLogin();
  const [busy, setBusy] = useState(false);

  const loginWithApple = useCallback(async () => {
    try {
      setBusy(true);

      const credentials = await signInAsync({
        requestedScopes: [AppleAuthenticationScope.EMAIL],
      });

      await socialLogin({
        variables: {
          email: credentials.email || '',
          providerId: credentials.user,
          providerName: OAuthProviders.Apple,
          token: credentials.identityToken,
        },
      });
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        // user canceled authorization
      } else {
        logger.error(error);
      }
    } finally {
      setBusy(false);
    }
  }, [socialLogin]);

  return [loginWithApple, busy];
};
