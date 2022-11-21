import { useAuthRequest } from 'expo-auth-session/providers/google';
import { useCallback, useEffect } from 'react';
import Config from 'react-native-config';
import { useSocialLogin } from '@/controllers/oauth/oauth.hooks/useSocialLogin';
import { GoogleApiUserInfo } from '@/controllers/oauth/oauth.interfaces';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

interface UseGoogleSignIn {
  (): [() => void, boolean];
}

export const useGoogleSignIn: UseGoogleSignIn = () => {
  const logger = useLogger({ name: 'Google Sign In' });
  const [socialLogin] = useSocialLogin();

  const [request, response, promptAsync] = useAuthRequest({
    expoClientId: Config.GOOGLE_GUID_EXPO_CLIENT,
    iosClientId: Config.GOOGLE_GUID_IOS_CLIENT,
    androidClientId: Config.GOOGLE_GUID_ANDROID_CLIENT,
  });

  const processGoogleAuth = useCallback(async (accessToken: string) => {
    try {
      const googleApiResponse = await fetch(
        `${GOOGLE_USER_INFO_URL}?access_token=${accessToken}`,
      );

      const userInfo: GoogleApiUserInfo = await googleApiResponse.json();

      await socialLogin({
        variables: {
          email: userInfo.email,
          providerId: userInfo.id,
          token: accessToken,
          providerName: OAuthProviders.Google,
        },
      });
    } catch (error) {
      logger.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      processGoogleAuth(response.authentication.accessToken);
    }
  }, [processGoogleAuth, response]);

  const loginWithGoogle = useCallback(async () => {
    try {
      promptAsync();
    } catch (error) {
      logger.error(error.message);
    }
  }, [logger, promptAsync]);

  return [loginWithGoogle, !request];
};
