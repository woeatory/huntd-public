import gql from 'graphql-tag';
import { CHAT_MESSAGE_BASE_FRAGMENT } from '@/modules/chatMessage/chatMessage.fragments.frontend/chatMessageBase.fragment';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    newMessage {
      ...ChatMessageBase
    }
  }
  ${CHAT_MESSAGE_BASE_FRAGMENT}
`;
