import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { generateSubscriptionTitle } from '@/components/Profile/HiringManagementModule/Subscriptions/generateSubscriptionTitle';
import {
  UserSubscriptionsDocument,
  useSubscribeToCandidatesSearchMutation,
} from '@/controllers/graphql/generated';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { useFiltersContext } from '@/components/Profile/ProfilesListModule/Filters/filters.context';

export const useCreateSubscription = () => {
  const router = useRouter();
  const { whereClause: queryValues } = useQueryBuilder(router.query);

  const [
    subscribeToSearch,
    { loading },
  ] = useSubscribeToCandidatesSearchMutation();

  const [user] = useAuthUser();

  const { formMethods } = useFiltersContext();

  const technologies = formMethods?.getValues('technologies');

  const subscribe = useCallback(async () => {
    const techs = technologies?.length
      ? technologies
      : null;

    const title = generateSubscriptionTitle(
      queryValues.specializations || null,
      techs,
    );

    await subscribeToSearch({
      variables: {
        title,
        searchParams: queryValues,
      },
      refetchQueries: [{
        query: UserSubscriptionsDocument,
      }],
      awaitRefetchQueries: true,
    });

    if (user) {
      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionCreated,
        {
          userId: user.id,
          ...queryValues,
        },
      );
    }
  }, [queryValues, subscribeToSearch, technologies, user]);

  return { subscribe, loading };
};
