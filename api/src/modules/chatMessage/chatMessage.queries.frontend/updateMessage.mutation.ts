import gql from 'graphql-tag';
import { CHAT_MESSAGE_BASE_FRAGMENT } from '@/modules/chatMessage/chatMessage.fragments.frontend/chatMessageBase.fragment';

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation updateMessage(
    $id: Int!
    $values: UpdateMessageValues!
  ) {
    updateMessage(
      id: $id
      values: $values
    ) {
      ...ChatMessageBase
    }
  }
  ${CHAT_MESSAGE_BASE_FRAGMENT}
`;
