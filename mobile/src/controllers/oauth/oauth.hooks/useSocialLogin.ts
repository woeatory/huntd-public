import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSocialSignUpMutation } from '@/controllers/graphql/generated';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { AuthStatus } from '@/controllers/auth/auth.typedefs';
import { useAuthContext } from '@/controllers/auth/auth.context';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

interface UseSocialLoginHook {
  (): ReturnType<typeof useSocialSignUpMutation>
}

export const useSocialLogin: UseSocialLoginHook = () => {
  const logger = useLogger({ name: 'Social login' });
  const { setAuthState } = useAuthContext();
  const client = useApolloClient();

  const [mutate, mutationResult] = useSocialSignUpMutation({
    async onCompleted(data) {
      if (data?.socialSignUp) {
        await AnalyticsClient.identify(
          data.socialSignUp.email,
          data.socialSignUp,
        );
        await AnalyticsClient.logEvent(AnalyticsEvents.auth.SignIn);

        setAuthState({
          authStatus: AuthStatus.LoggedIn,
        });

      }
    },
  });

  const customMutate: typeof mutate = useCallback(
    async (options) => {
      const result = await mutate({
        variables: {
          ...options!.variables!,
        },
      });

      if (result.data) {
        await client.resetStore();

        const analyticsEvent = result.data?.socialSignUp.created
          ? AnalyticsEvents.auth.SignUp
          : AnalyticsEvents.auth.SignIn;

        await AnalyticsClient.logEvent(analyticsEvent, {
          method: 'SOCIAL',
          provider: options?.variables?.providerName,
        });

        logger.info(`${options?.variables?.providerName}`, {
          userId: result.data?.socialSignUp.id,
          created: result.data?.socialSignUp.created,
        });
      }

      return result;
    }, [mutate],
  );

  return [customMutate, mutationResult];
};
