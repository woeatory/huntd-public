import { useCallback } from 'react';
import { getApiLink } from '@/lib/getApiLink';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { usePopupWindow } from '@/controllers/popupWindow/popupWindow.hooks/usePopupWindow';
import { AuthMessageTypes, AuthPopupMessage } from '@/controllers/oauth/oauth.typedefs';

export const useOpenOAuthPopup = (provider: OAuthProviders) => {
  const url = getApiLink(`rest/oauth/${provider}`);

  const openPopup = usePopupWindow({ url });

  return useCallback(() => {
    const authWindow = openPopup();

    return new Promise<AuthPopupMessage>((resolve) => {
      const closeCallback = () => {
        resolve({ success: false, payload: null, error: 'Popup window closed' });
      };

      const callback = (e: MessageEvent) => {
        if (e.data.type === AuthMessageTypes.OAuthPopupResponse) {
          try {
            resolve({ success: true, payload: JSON.parse(e.data.payload) });
          } catch {
            resolve({ success: true, payload: e.data.payload });
          } finally {
            window.removeEventListener('message', callback);

            authWindow?.addEventListener('beforeunload', closeCallback);
            authWindow?.close();
          }
        }
      };

      window.addEventListener('message', callback);
    });
  }, [openPopup]);
};
