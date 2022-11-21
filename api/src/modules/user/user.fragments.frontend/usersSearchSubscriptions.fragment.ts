import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscription.full.fragment';

export const USERS_SEARCH_SUBSCRIPTIONS_FRAGMENT = gql`
  fragment SearchSubscriptions on User {
    searchSubscriptions {
      ...UsersSearchSubscriptionFull
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT}
`;
