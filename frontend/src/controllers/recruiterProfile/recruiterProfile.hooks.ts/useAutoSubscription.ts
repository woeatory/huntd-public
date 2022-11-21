import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { useUserSubscriptionsQuery } from '@/controllers/graphql/generated';
import { useCompareSubscriptionUrl } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useCompareSubscriptionUrl';
import { useCreateSubscription } from '@/controllers/subscription/subscription.hooks/useCreateSubscription';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { analytics } from '@/controllers/analytics/analytics.client';

export const useAutoSubscription = () => {
  const [user] = useAuthUser();

  const router = useRouter();

  const {
    whereClause: queryValues,
  } = useQueryBuilder(router.query);

  const hasSearchFilters = Object.values(queryValues).length > 0;

  const { data } = useUserSubscriptionsQuery();

  const subscriptions = useMemo(
    () => data?.authUser?.searchSubscriptions ?? [],
    [data],
  );

  const compareUrl = useCompareSubscriptionUrl();

  const isSubscriptionExist = subscriptions.some(
    ({ subscriptionUrl }) => compareUrl({
      subscriptionUrl,
    }),
  );

  const { subscribe } = useCreateSubscription();

  const handleSubscribe = async () => {
    await subscribe();

    analytics.sendEvent(
      analytics.events.subscriptions.AutoSubscription,
      {
        userId: user?.id,
        ...queryValues,
      },
    );
  };

  return {
    subscribe: handleSubscribe,
    isSubscriptionExist,
    hasSearchFilters,
  };
};
