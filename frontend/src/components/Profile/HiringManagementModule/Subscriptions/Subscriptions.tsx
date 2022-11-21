import React, { useMemo } from 'react';
import {
  useUserSubscriptionsQuery,
} from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { SubscriptionsList } from '@/components/Profile/HiringManagementModule/Subscriptions/SubscriptionsList';
import { EmptyList } from '@/components/Profile/HiringManagementModule/EmptyList/EmptyList';

export const Subscriptions = () => {
  const {
    data: subscriptionsData, loading,
  } = useUserSubscriptionsQuery();
  const { t } = useTranslation([Namespaces.Profile]);

  const subscriptions = useMemo(() => {
    if (!subscriptionsData?.authUser?.searchSubscriptions || loading) {
      return [];
    }

    const { searchSubscriptions } = subscriptionsData.authUser;

    return searchSubscriptions;
  }, [subscriptionsData, loading]);

  return (
    <div className="grid-container mt-32">
      <div className="grid-x grid-margin-x">
        {subscriptions.length
          ? (
            <SubscriptionsList
              subscriptions={subscriptions}
              subscriptionsData={subscriptionsData}
            />
          )
          : (
            <EmptyList
              heading={t(`${Namespaces.Profile}:no_subscriptions_title`)}
              subheading={t(`${Namespaces.Profile}:no_subscriptions_description`)}
            />
          )}
      </div>
    </div>
  );
};
