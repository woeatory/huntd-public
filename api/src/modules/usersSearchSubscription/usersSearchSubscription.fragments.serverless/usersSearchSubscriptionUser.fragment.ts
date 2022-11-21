import gql from 'graphql-tag';

export const USERS_SEARCH_SUBSCRIPTION_USER_FRAGMENT = gql`
  fragment UsersSearchSubscriptionUser on UsersSearchSubscription {
    user {
      email
    }
  }
`;
