import gql from 'graphql-tag';

export const UPDATE_STATUSES_NOTIFICATIONS_TIME_MUTATION = gql`
  mutation updateStatusesNotificationTime (
    $profileIds: [Int!]!
  ) {
    updateStatusesNotificationTime(
      profileIds: $profileIds
    )
  }
`;
