import gql from 'graphql-tag';

export const USER_UNREAD_MESSAGES_COUNT_FRAGMENT = gql`
  fragment UserUnreadMessagesCount on User {
    id
    unreadMessagesCount
  }
`;
