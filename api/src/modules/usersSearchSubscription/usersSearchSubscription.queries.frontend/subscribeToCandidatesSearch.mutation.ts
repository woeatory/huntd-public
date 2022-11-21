import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT } from '@/modules/usersSearchSubscription/usersSearchSubscription.fragments.frontend/usersSearchSubscriptionBase.fragment';

export const SUBSCRIBE_TO_CANDIDATES_SEARCH_MUTATION = gql`
  mutation subscribeToCandidatesSearch(
    $userId: Int,
    $title: String!,
    $searchParams: PublicProfilesParameters!
  ) {
    subscribeToCandidatesSearch(
      userId: $userId
      title: $title
      searchParams: $searchParams
    ) {
      ...UsersSearchSubscriptionBase
    }
  }
  ${USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT}
`;
