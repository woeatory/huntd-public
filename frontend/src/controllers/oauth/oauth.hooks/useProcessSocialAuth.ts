import {
  OAuthProviders,
  SocialSignUpMutationFn,
} from '@/controllers/graphql/generated';
import { AuthPopupMessage } from '@/controllers/oauth/oauth.typedefs';
import { useSocialPresubscribedSignUp } from '@/controllers/oauth/oauth.hooks/useSocialPresubscribedSignUp';
import { useCheckOAuthProfile } from './useCheckOAuthProfile';

export const useProcessSocialAuth = (options = { username: '' }) => {
  const { username } = options;
  const [checkOAuthProfileErrors] = useCheckOAuthProfile();

  const [socialSignUpAsInactiveUserMutation] = useSocialPresubscribedSignUp();

  return async (
    profile: AuthPopupMessage,
    providerName: OAuthProviders,
    socialAuthMutation?: SocialSignUpMutationFn,
  ) => {
    checkOAuthProfileErrors(profile);

    try {
      if (username) {
        await socialSignUpAsInactiveUserMutation({
          variables: {
            username,
            email: profile.payload?.emails[0]?.value,
            providerId: profile.payload?.id,
            providerName,
            token: profile.payload?.accessToken,
          },
        });
      } else if (socialAuthMutation) {
        await socialAuthMutation({
          variables: {
            email: profile.payload?.emails[0]?.value,
            providerId: profile.payload?.id,
            providerName,
            token: profile.payload?.accessToken,
          },
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.message);
    }

    return null;
  };
};
