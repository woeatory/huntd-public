import gql from 'graphql-tag';

export const USERS_SEARCH_SUBSCRIPTION_BASE_FRAGMENT = gql`
  fragment UsersSearchSubscriptionBase on UsersSearchSubscription {
    id
    title
    userId
    lastUsed
    lastNotified
  }
`;
