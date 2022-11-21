import React, {
  useEffect, useState, useCallback,
  useMemo, SetStateAction, Dispatch,
} from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { SelectUi } from '@/components/FormElements/Select';
import {
  UsersSearchSubscription, useUserSubscriptionsQuery,
} from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useGoToSubscriptionSearchPage } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useGoToSearchPage';
import { useCompareSubscriptionUrl } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useCompareSubscriptionUrl';
import styles from '@/components/Profile/HiringManagementModule/Subscriptions/SubscriptionsSelect.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { SubscriptionsTitleEditor } from '@/components/Profile/HiringManagementModule/Subscriptions/SubscriptionsTitleEditor';
import { DashedLineHorizontal } from '@/ui/icons/general/DashedLineHorizontal';

interface GetSubscriptionsOptions {
  (
    subscriptions: UsersSearchSubscription[],
  ): SelectOption[]
}

interface Props {
  selectedSubscription: SelectOption | null;
  setSelectedSubscription: Dispatch<SetStateAction<SelectOption | null>>
}

const getSubscriptionsOptions: GetSubscriptionsOptions = (
  subscriptions,
) => subscriptions.map((subscription) => ({
  label: subscription.title,
  value: `${subscription.id}`,
}));

export const SubscriptionsSelect = ({
  setSelectedSubscription, selectedSubscription,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const compareUrl = useCompareSubscriptionUrl();

  const { t } = useTranslation([Namespaces.Common]);

  const {
    data, loading, error,
  } = useUserSubscriptionsQuery();

  const subscriptions = useMemo(
    () => data?.authUser?.searchSubscriptions ?? [],
    [data],
  );

  const {
    goToSearchPage,
    updateInProgress,
  } = useGoToSubscriptionSearchPage({
    subscriptionsData: data,
  });

  const selectSubscription = useCallback(
    async ({ value }: SelectOption) => {
      setIsEditing(false);
      const subscription = subscriptions.find((sub) => sub.id === +value);

      if (!subscription) {
        setSelectedSubscription(null);

        return;
      }

      setSelectedSubscription({
        value: `${subscription.id}`,
        label: subscription.title,
      });

      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionUsed,
        {},
      );

      await goToSearchPage(subscription);
    },
    [goToSearchPage, subscriptions, setSelectedSubscription],
  );

  useEffect(() => {
    setIsEditing(false);
    const subscription = subscriptions.find(
      ({ subscriptionUrl }) => {
        const isSubscriptionExist = compareUrl({
          subscriptionUrl,
        });

        return isSubscriptionExist;
      },
    );

    if (subscription) {
      setSelectedSubscription({
        value: `${subscription.id}`,
        label: subscription.title,
      });

      return;
    }

    setSelectedSubscription(null);
  }, [subscriptions, compareUrl, setSelectedSubscription]);

  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <>
      {isEditing
        ? (
          <SubscriptionsTitleEditor
            selectedSubscription={selectedSubscription}
            setIsEditing={setIsEditing}
          />
        )
        : (
          <div className={styles.selectContainer}>
            <SelectUi
              isDisabled={updateInProgress}
              value={selectedSubscription}
              isLoading={loading || !!error}
              className={styles.subscriptionSelect}
              placeholder={t(`${Namespaces.Common}:subscriptions_select_placeholder`)}
              isSearchable={false}
              options={getSubscriptionsOptions(subscriptions)}
              isOptionDisabled={(option) => (
                option.value === selectedSubscription?.value
              )}
              onChange={(e) => {
                selectSubscription(e as SelectOption);
              }}
            />
            {selectedSubscription && (
              <Button
                type="button"
                className={cn(styles.editTitle)}
                onClick={() => setIsEditing((prev) => !prev)}
                text={t(`${Namespaces.Common}:rename_subscription`)}
              />
            )}
          </div>
        )}
      <div className={styles.dividerContainer}>
        <DashedLineHorizontal imageWidth="345" />
      </div>
    </>
  );
};
