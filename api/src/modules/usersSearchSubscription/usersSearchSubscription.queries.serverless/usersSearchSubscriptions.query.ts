import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.serverless/usersSearchSubscription.full.fragment';

export const USERS_SEARCH_SUBSCRIPTIONS_QUERY = gql`
  query usersSearchSubscriptions {
    usersSearchSubscriptions {
      ...UsersSearchSubscriptionFull
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT}
`;
