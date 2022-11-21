import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscriptionBase.fragment';
import { USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscriptionParams.fragment';
import { USERS_SEARCH_SUBSCRIPTION_STRINGIFIED_PARAMS_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscriptionStringifiedParams';

export const USERS_SEARCH_SUBSCRIPTION_FULL_FRAGMENT = gql`
  fragment UsersSearchSubscriptionFull on UsersSearchSubscription {
    ...UsersSearchSubscriptionBase
    ...UsersSearchSubscriptionParams
    ...UsersSearchSubscriptionStringifiedParams
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
  ${USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT}
  ${USERS_SEARCH_SUBSCRIPTION_STRINGIFIED_PARAMS_FRAGMENT}
`;
