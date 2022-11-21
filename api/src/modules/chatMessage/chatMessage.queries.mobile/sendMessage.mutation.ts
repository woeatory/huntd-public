import gql from 'graphql-tag';
import { CHAT_MESSAGE_BASE_FRAGMENT } from '@/modules/chatMessage/chatMessage.fragments.mobile/chatMessageBase.fragment';

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage(
    $profileConnectionId: Int!
    $message: String!
  ) {
    sendMessage(
      message: $message
      profileConnectionId: $profileConnectionId
    ) {
      ...ChatMessageBase
    }
  }
  ${CHAT_MESSAGE_BASE_FRAGMENT}
`;
