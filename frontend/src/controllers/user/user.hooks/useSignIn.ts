import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSignInMutation } from '@/controllers/graphql/generated';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';
import { Router } from '@/controllers/i18n/i18n.client';
import { processUserAnalytics } from '@/controllers/auth/auth.utils/auth.processUserAnalytics';
import { analytics } from '@/controllers/analytics/analytics.client';

export const useSignIn = () => {
  const client = useApolloClient();
  const { query } = useRouter();
  const redirectUrl = query.redirectUrl as string;

  return useSignInMutation({
    async onCompleted(data) {
      await client.resetStore();

      if (data?.signIn) {
        processUserAnalytics(data.signIn);

        analytics.sendEvent(analytics.events.auth.SignIn, {
          method: 'password',
        });

        if (redirectUrl) {
          await Router.replace(decodeURIComponent(redirectUrl));

          return;
        }

        const destination = getLoginRedirect(data.signIn);

        await Router.replace(destination);
      }
    },
  });
};
