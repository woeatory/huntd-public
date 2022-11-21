import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { AuthUserDocument, useSignUpMutation } from '@/controllers/graphql/generated';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { AuthStatus } from '@/controllers/auth/auth.typedefs';
import { useAuthContext } from '@/controllers/auth/auth.context';

interface UseSignUp {
  (): ReturnType<typeof useSignUpMutation>;
}

export const useSignUp: UseSignUp = () => {
  const logger = useLogger({ name: 'Sign up' });

  const [mutate, query] = useSignUpMutation();
  const { setAuthState } = useAuthContext();

  const signUpCallback: typeof mutate = async (options) => {
    const response = await mutate({
      variables: options?.variables,
      refetchQueries: [{ query: AuthUserDocument }],
      awaitRefetchQueries: true,
    });

    if (response.data?.signUp) {
      await AnalyticsClient.identify(
        response.data.signUp.email,
        response.data.signUp,
      );
      await AnalyticsClient.logEvent(AnalyticsEvents.auth.SignUp);

      setAuthState({ authStatus: AuthStatus.LoggedIn });

      logger.info(`User signed up: ${response.data.signUp.id}`);
    }

    return response;
  };

  return [signUpCallback, query];
};
