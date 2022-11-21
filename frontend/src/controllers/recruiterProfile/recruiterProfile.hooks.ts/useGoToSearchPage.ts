import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  useUpdateSubscriptionLastUsedMutation,
  UserSubscriptionsDocument,
  UsersSearchSubscription,
  UserSubscriptionsQuery,
} from '@/controllers/graphql/generated';

interface UseGoToOptions {
  subscriptionsData?: UserSubscriptionsQuery
}

export const useGoToSubscriptionSearchPage = ({
  subscriptionsData,
}: UseGoToOptions) => {
  const router = useRouter();

  const user = useMemo(() => subscriptionsData?.authUser,
    [subscriptionsData]);

  const [
    updateLastUsed, {
      loading: updateInProgress,
    },
  ] = useUpdateSubscriptionLastUsedMutation();

  const goToSearchPage = useCallback(
    async (subscription: UsersSearchSubscription) => {
      if (user) {
        await updateLastUsed({
          variables: {
            id: subscription.id,
            userId: user.id,
          },
          refetchQueries: [
            {
              query: UserSubscriptionsDocument,
            },
          ],
          awaitRefetchQueries: true,
        });

        const { subscriptionUrl } = subscription;

        await router.push(subscriptionUrl);
      }
    },
    [updateLastUsed, user, router],
  );

  return {
    goToSearchPage,
    updateInProgress,
  };
};
