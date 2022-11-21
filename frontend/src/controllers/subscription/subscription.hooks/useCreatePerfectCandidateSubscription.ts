import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { generateSubscriptionTitle } from '@/components/Profile/HiringManagementModule/Subscriptions/generateSubscriptionTitle';
import { FormDataValues, LocationState } from '@/components/Profile/ProfilesListModule/Filters';
import {
  UserSubscriptionsDocument,
  useSubscribeToCandidatesSearchMutation,
  useUserByUsernameLazyQuery,
} from '@/controllers/graphql/generated';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Routes } from '@/controllers/router/router.constants';
import { getPublicProfilesParams } from '@/components/Profile/ProfilesListModule/Filters/Filters.helpers';

export const useCreatePerfectCandidateSubscription = () => {
  const [
    subscribeToSearch,
    { loading },
  ] = useSubscribeToCandidatesSearchMutation();

  const [user] = useAuthUser();

  const router = useRouter();

  const [getUser, { data }] = useUserByUsernameLazyQuery();

  useEffect(() => {
    if (router.query.username) {
      getUser({
        variables: {
          username: router.query.username as string,
        },
      });
    }
  }, [router.query, getUser]);

  const subscribe = useCallback(async (
    props: FormDataValues, locationsState: LocationState,
  ) => {
    const { technologies } = props;
    const searchParams = getPublicProfilesParams(props, locationsState);

    const techs = technologies?.length
      ? technologies
      : null;

    const title = generateSubscriptionTitle(
      searchParams.specializations || null,
      techs,
    );

    await subscribeToSearch({
      variables: {
        userId: data?.userByUsername?.id,
        title,
        searchParams,
      },
      refetchQueries: [
        {
          query: UserSubscriptionsDocument,
        },
      ],
      awaitRefetchQueries: true,
    });

    if (router.query.username && data?.userByUsername) {
      const promoLink = `https://huntd.tech${Routes.Engineers}?companyId=${data.userByUsername.username}`;

      await navigator.clipboard.writeText(promoLink);

      alert(promoLink);

      await router.push(Routes.Home);
    }

    if (user && !router.query.username) {
      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionCreated,
        {
          userId: user.id,
          ...searchParams,
          type: 'perfect_candidate',
        },
      );
    }
  }, [
    subscribeToSearch,
    user,
    data,
    router,
  ]);

  return { subscribe, loading };
};
