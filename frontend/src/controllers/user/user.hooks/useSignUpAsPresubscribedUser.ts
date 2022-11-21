import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useSignUpAsInactiveUserMutation,
  useSignUpMutation,
  useUserByUsernameQuery, useUserSearchSubscriptionsByUserIdQuery,
} from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { analytics } from '@/controllers/analytics/analytics.client';
import { createLogger } from '@/controllers/logger/logger.client';
import { processUserAnalytics } from '@/controllers/auth/auth.utils/auth.processUserAnalytics';

interface UseSignUp {
  (): ReturnType<typeof useSignUpAsInactiveUserMutation>
}
export const useSignUpAsPresubscribedUser: UseSignUp = () => {
  const { query } = useRouter();
  const client = useApolloClient();

  const { data: userData } = useUserByUsernameQuery({
    variables: {
      username: query.companyId as string,
    },
  });

  const user = useMemo(
    () => userData?.userByUsername ?? null,
    [userData],
  );

  const { data: subscriptionData } = useUserSearchSubscriptionsByUserIdQuery({
    variables: {
      userId: user?.id,
    },
  });

  const subscription = useMemo(
    () => (subscriptionData?.userSearchSubscriptionsByUserId
      ? subscriptionData?.userSearchSubscriptionsByUserId[0]
      : null),
    [subscriptionData],
  );

  const [mutate, mutationResult] = useSignUpAsInactiveUserMutation({
    async onCompleted(data) {
      await client.resetStore();

      if (data?.signUpAsInactiveUser) {
        processUserAnalytics(data.signUpAsInactiveUser);

        createLogger({ name: useSignUpMutation.name })
          .info(`User signed up: "${data.signUpAsInactiveUser.id}"`);

        if (subscription) {
          const { subscriptionUrl } = subscription;

          await Router.replace(subscriptionUrl);
        }
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
      data?.signUpAsInactiveUser.created
        ? analytics.events.auth.SignUp
        : analytics.events.auth.SignIn,
      {
        method: 'presubscribed',
      },
    );

    return result;
  };

  return [customMutate, mutationResult];
};
