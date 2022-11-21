import gql from 'graphql-tag';

export const CHAT_MESSAGE_BASE_FRAGMENT = gql`
  fragment ChatMessageBase on ChatMessage {
    id
    message
    profileConnectionId
    isSystemMessage
    createdAt
    updatedAt
    senderUser {
      isAuthUser
    }
    recipientUser {
      isAuthUser
    }
  }
`;
