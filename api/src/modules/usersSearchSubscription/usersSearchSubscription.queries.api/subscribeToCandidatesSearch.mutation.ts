import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.api/usersSearchSubscriptionBase.fragment';
import { USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.api/usersSearchSubscriptionParams.fragment';

export const SUBSCRIBE_TO_CANDIDATES_SEARCH_MUTATION = gql`
  mutation subscribeToCandidatesSearch(
    $title: String!,
    $userId: Int,
    $searchParams: PublicProfilesParameters!
  ) {
    subscribeToCandidatesSearch(
      title: $title
      userId: $userId
      searchParams: $searchParams
    ) {
      ...UsersSearchSubscriptionBase
      ...UsersSearchSubscriptionParams
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
  ${USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT}
`;
