import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  useSocialSignUpAsInactiveUserMutation,
  useSocialSignUpMutation,
  useUserByUsernameQuery, useUserSearchSubscriptionsByUserIdQuery,
} from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { analytics } from '@/controllers/analytics/analytics.client';
import { createLogger } from '@/controllers/logger/logger.client';
import { processUserAnalytics } from '@/controllers/auth/auth.utils/auth.processUserAnalytics';

interface useSocialSignUp {
  (): ReturnType<typeof useSocialSignUpAsInactiveUserMutation>
}
export const useSocialPresubscribedSignUp: useSocialSignUp = () => {
  const client = useApolloClient();
  const { query } = useRouter();

  const { data: userData } = useUserByUsernameQuery({
    variables: {
      username: query.companyId as string,
    },
  });

  const user = userData?.userByUsername ?? null;

  const { data: subscriptionData } = useUserSearchSubscriptionsByUserIdQuery({
    variables: {
      userId: user?.id,
    },
  });

  const subscription = subscriptionData?.userSearchSubscriptionsByUserId
    ? subscriptionData?.userSearchSubscriptionsByUserId[0]
    : null;

  const [mutate, mutationResult] = useSocialSignUpAsInactiveUserMutation({
    async onCompleted(data) {
      await client.resetStore();

      if (data?.socialSignUpAsInactiveUser) {
        processUserAnalytics(data.socialSignUpAsInactiveUser);

        createLogger({ name: useSocialSignUpMutation.name })
          .info(`User signed up: "${data.socialSignUpAsInactiveUser.id}"`);

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

    analytics.sendEvent(data?.socialSignUpAsInactiveUser.created
      ? analytics.events.auth.SignUp
      : analytics.events.auth.SignIn,
    {
      method: 'presubscribed_social',
      provider: options?.variables?.providerName,
    });

    return result;
  };

  return [customMutate, mutationResult];
};
