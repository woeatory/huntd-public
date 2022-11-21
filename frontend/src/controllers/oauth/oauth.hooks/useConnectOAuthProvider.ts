import { OAuthProviders, useConnectOAuthProviderMutation } from '@/controllers/graphql/generated';
import { useOpenOAuthPopup } from '@/controllers/oauth/oauth.hooks/useOpenOAuthPopup';
import { useCheckOAuthProfile } from './useCheckOAuthProfile';

export const useConnectOAuthProvider = (provider: OAuthProviders) => {
  const [connectProvider] = useConnectOAuthProviderMutation();
  const openOAuthPopup = useOpenOAuthPopup(provider);
  const [checkOAuthProfileErrors] = useCheckOAuthProfile();

  return async () => {
    try {
      const profile = await openOAuthPopup();

      checkOAuthProfileErrors(profile);

      await connectProvider({
        variables: {
          id: profile.payload?.id,
          provider,
          token: profile.payload?.accessToken,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.message);
    }

    return null;
  };
};
