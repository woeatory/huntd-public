import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.api/usersSearchSubscriptionBase.fragment';

export const UPDATE_SUBSCRIPTION_TITLE_MUTATION = gql`
  mutation updateSubscriptionTitle(
    $id: Int!,
    $userId: Int!,
    $values: UpdateSubscriptionsTitleValues!
  ) {
    updateSubscriptionTitle(id: $id, userId: $userId, values: $values) {
      ...UsersSearchSubscriptionBase
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
`;
