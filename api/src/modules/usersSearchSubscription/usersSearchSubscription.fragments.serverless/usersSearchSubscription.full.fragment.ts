import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.serverless/usersSearchSubscriptionBase.fragment';
import { USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.serverless/usersSearchSubscriptionParams.fragment';
import { USERS_SEARCH_SUBSCRIPTION_USER_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.serverless/usersSearchSubscriptionUser.fragment';

export const USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT = gql`
  fragment UsersSearchSubscriptionFull on UsersSearchSubscription {
    ...UsersSearchSubscriptionBase
    ...UsersSearchSubscriptionParams
    ...UsersSearchSubscriptionUser
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
  ${USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT}
  ${USERS_SEARCH_SUBSCRIPTION_USER_FRAGMENT}
`;
