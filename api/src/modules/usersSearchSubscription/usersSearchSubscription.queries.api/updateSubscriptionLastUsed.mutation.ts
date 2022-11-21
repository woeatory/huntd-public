import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.api/usersSearchSubscriptionBase.fragment';

export const UPDATE_SUBSCRIPTION_LAST_USED_MUTATION = gql`
  mutation updateSubscriptionLastUsed($id: Int!, $userId: Int!) {
    updateSubscriptionLastUsed(id: $id, userId: $userId) {
      ...UsersSearchSubscriptionBase
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
`;
