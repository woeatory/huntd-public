import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import {
  useUnsubscribeFromCandidatesSearchMutation,
  UserSubscriptionsDocument,
  UsersSearchSubscription,
  UserSubscriptionsQuery,
} from '@/controllers/graphql/generated';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useGetSubscriptionParams } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useGetSubscriptionParams';
import { useGoToSubscriptionSearchPage } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useGoToSearchPage';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/Profile/HiringManagementModule/Subscriptions/Subscriptions.module.scss';

interface Props {
  subscriptionsData?: UserSubscriptionsQuery,
  subscriptions: UsersSearchSubscription[],
}

export const SubscriptionsList: FC<Props> = (props) => {
  const { subscriptionsData, subscriptions } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  const user = subscriptionsData?.authUser;

  const [
    unsubscribeMutation, {
      loading: mutationInProgress,
    },
  ] = useUnsubscribeFromCandidatesSearchMutation();

  const {
    goToSearchPage,
    updateInProgress,
  } = useGoToSubscriptionSearchPage({
    subscriptionsData,
  });

  const { getSubscriptionParams } = useGetSubscriptionParams();

  const viewSubscription = useCallback(
    (subscription: UsersSearchSubscription) => {
      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionUsed,
        {},
      );

      goToSearchPage(subscription);
    },
    [goToSearchPage],
  );

  const unsubscribe = useCallback(async (subscriptionId: number) => {
    if (user) {
      await unsubscribeMutation({
        variables: {
          id: subscriptionId,
          userId: user.id,
        },
        refetchQueries: [
          {
            query: UserSubscriptionsDocument,
          },
        ],
        awaitRefetchQueries: true,
      });

      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionDeleted,
        {},
      );
    }
  }, [unsubscribeMutation, user]);

  return (
    <>
      <div className="cell large-6 large-offset-2">
        <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-8')}>
          {t(`${Namespaces.Profile}:recruiter_profile_subscriptions_heading`)}
        </h1>
      </div>

      <div className="cell large-offset-2 large-4 mb-32">
        <p className={cn(typography.smallCaption, 'c-gray')}>
          {t(`${Namespaces.Profile}:recruiter_profile_subscriptions_description`)}
        </p>
      </div>

      <div className="cell large-offset-2 large-9">
        <div className="grid-x grid-margin-x">
          {subscriptions.map((subscription) => {
            const params = getSubscriptionParams(subscription);

            return (
              <div
                key={subscription.id}
                className={cn(styles.card, 'cell large-4 medium-6')}
              >
                <ul>
                  <li className={styles.item}>
                    {subscription.title}
                  </li>
                  {params.map((parameter) => (
                    <li
                      key={parameter}
                      className={styles.item}
                    >
                      {parameter}
                    </li>
                  ))}
                </ul>

                <Button
                  mode={Button.mode.Primary}
                  type="button"
                  disabled={mutationInProgress || updateInProgress}
                  onClick={() => viewSubscription(subscription)}
                  className={cn('wide', styles.viewCandidatesButton)}
                  text={t(`${Namespaces.Profile}:view_candidates`)}
                />

                <Button
                  mode={Button.mode.Secondary}
                  type="button"
                  disabled={mutationInProgress || updateInProgress}
                  onClick={() => unsubscribe(subscription.id)}
                  className='wide'
                  text={t(`${Namespaces.Profile}:unsubscribe_from_search`)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
