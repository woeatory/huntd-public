import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { AuthPopupMessage } from '@/controllers/oauth/oauth.typedefs';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

export const useCheckOAuthProfile = () => {
  const flashMessage = useFlashMessage();
  const { t } = useTranslation([Namespaces.Auth]);

  const checkOAuthProfile = (profile: AuthPopupMessage) => {
    if (!profile.success) {
      flashMessage.postMessage({
        variables: {
          heading: t(`${Namespaces.Auth}:social_auth_failed_title`),
          text: t(`${Namespaces.Auth}:social_auth_failed_text`, {
            error: profile.error,
          }),
          type: flashMessage.messageTypes.Error,
        },
      });

      return null;
    }

    if (!profile.payload?.emails[0]?.value) {
      throw new Error(`oAuth profile email should be filled in to process social sign up`);
    }

    return null;
  };

  return [checkOAuthProfile];
};
