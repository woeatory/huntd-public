import gql from 'graphql-tag';
import { CHAT_MESSAGE_BASE_FRAGMENT } from '@/modules/chatMessage/chatMessage.fragments.frontend/chatMessageBase.fragment';

export const PROFILE_CONNECTION_MESSAGES_FRAGMENT = gql`
  fragment ProfileConnectionMessages on ProfileConnection {
    chatMessages {
      ...ChatMessageBase
    }
  }
  ${CHAT_MESSAGE_BASE_FRAGMENT}
`;
