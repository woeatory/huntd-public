import gql from 'graphql-tag';
import { CHAT_MESSAGE_BASE_FRAGMENT } from '@/modules/chatMessage/chatMessage.fragments.mobile/chatMessageBase.fragment';

export const PROFILE_CONNECTION_MESSAGES_QUERY = gql`
  query profileConnectionMessages($profileConnectionId: Int!) {
    profileConnection(id: $profileConnectionId) {
      id
      chatMessages {
        ...ChatMessageBase
      }
    }
  }
  ${CHAT_MESSAGE_BASE_FRAGMENT}
`;
