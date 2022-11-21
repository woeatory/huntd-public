import gql from 'graphql-tag';

export const PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT = gql`
  fragment ProfileConnectionUnreadMessagesCount on ProfileConnection {
    unreadMessagesCount
  }
`;
