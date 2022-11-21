import gql from 'graphql-tag';
import { USERS_SEARCH_SUBSCRIPTIONS_FRAGMENT } from '@/modules/user/user.fragments.frontend/usersSearchSubscriptions.fragment';

export const USER_SUBSCRIPTIONS = gql`
  query userSubscriptions {
    authUser {
      id
      ...SearchSubscriptions
    }
  }
  ${USERS_SEARCH_SUBSCRIPTIONS_FRAGMENT}
`;
