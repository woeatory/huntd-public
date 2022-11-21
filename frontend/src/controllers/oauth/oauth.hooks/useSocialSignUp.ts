import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSocialSignUpMutation } from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';
import { analytics } from '@/controllers/analytics/analytics.client';
import { createLogger } from '@/controllers/logger/logger.client';
import { processUserAnalytics } from '@/controllers/auth/auth.utils/auth.processUserAnalytics';

interface UseSocialSignUp {
  (): ReturnType<typeof useSocialSignUpMutation>
}
export const useSocialSignUp: UseSocialSignUp = () => {
  const client = useApolloClient();
  const { query } = useRouter();
  const redirectUrl = query.redirectUrl as string;

  const [mutate, mutationResult] = useSocialSignUpMutation({
    async onCompleted(data) {
      await client.resetStore();

      if (data?.socialSignUp) {
        processUserAnalytics(data.socialSignUp);

        createLogger({ name: useSocialSignUpMutation.name })
          .info(`User signed up: "${data.socialSignUp.id}"`);

        if (redirectUrl) {
          await Router.replace(decodeURIComponent(redirectUrl));

          return;
        }

        const destination = getLoginRedirect(data.socialSignUp);

        await Router.replace(destination);
      }
    },
  });

  const customMutate: typeof mutate = async (options) => {
    const result = await mutate({
      ...options,
      variables: {
        ...options!.variables!,
        ...analytics.getUserEngagementFields(),
      },
    });

    const { data } = result;

    analytics.sendEvent(data?.socialSignUp.created
      ? analytics.events.auth.SignUp
      : analytics.events.auth.SignIn,
    {
      method: 'social',
      provider: options?.variables?.providerName,
    });

    return result;
  };

  return [customMutate, mutationResult];
};
