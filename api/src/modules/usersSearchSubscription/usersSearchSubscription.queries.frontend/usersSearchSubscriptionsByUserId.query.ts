import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscription.full.fragment';

export const USERS_SEARCH_SUBSCRIPTIONS_BY_USER_ID_QUERY = gql`
  query userSearchSubscriptionsByUserId($userId: Int) {
    userSearchSubscriptionsByUserId(userId: $userId) {
      ...UsersSearchSubscriptionFull
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT}
`;
