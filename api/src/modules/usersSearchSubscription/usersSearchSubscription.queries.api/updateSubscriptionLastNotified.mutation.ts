import gql from 'graphql-tag';

export const UPDATE_SUBSCRIPTION_LAST_NOTIFIED_MUTATION = gql`
  mutation updateSubscriptionLastNotified($subscriptionsIds: [Int!]) {
    updateSubscriptionLastNotified(subscriptionsIds: $subscriptionsIds)
  }
`;
