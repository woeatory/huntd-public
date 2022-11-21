import gql from 'graphql-tag';
import { USER_UNREAD_MESSAGES_COUNT_FRAGMENT } from '@/modules/user/user.fragments.frontend/userUnreadMessagesCount.fragment';

export const USER_UNREAD_MESSAGES_QUERY = gql`
  query userUnreadMessagesCount {
    authUser {
      ...UserUnreadMessagesCount
    }
  }
  ${USER_UNREAD_MESSAGES_COUNT_FRAGMENT}
`;
