import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSignUpMutation } from '@/controllers/graphql/generated';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';
import { Router } from '@/controllers/i18n/i18n.client';
import { analytics } from '@/controllers/analytics/analytics.client';
import { createLogger } from '@/controllers/logger/logger.client';
import { processUserAnalytics } from '@/controllers/auth/auth.utils/auth.processUserAnalytics';

interface UseSignUp {
  (): ReturnType<typeof useSignUpMutation>
}
export const useSignUp: UseSignUp = () => {
  const { query } = useRouter();
  const client = useApolloClient();

  const [mutate, mutationResult] = useSignUpMutation({
    async onCompleted(data) {
      await client.resetStore();

      if (data?.signUp) {
        processUserAnalytics(data.signUp);

        createLogger({ name: useSignUpMutation.name })
          .info(`User signed up: "${data.signUp.id}"`);

        if (query.redirect) {
          await Router.replace(query.redirect as string);

          return;
        }

        const destination = getLoginRedirect(data.signUp);

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

    analytics.sendEvent(
      data?.signUp.created
        ? analytics.events.auth.SignUp
        : analytics.events.auth.SignIn,
      {
        method: 'password',
        source: 'sign_up_page',
      },
    );

    return result;
  };

  return [customMutate, mutationResult];
};
