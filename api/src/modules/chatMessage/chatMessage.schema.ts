import gql from 'graphql-tag';

export const ChatMessageSchema = gql`
  extend type Subscription {
    newMessage: ChatMessage
  }

  extend type Mutation {
    sendMessage(
      profileConnectionId: Int!
      message: String!
    ): ChatMessage!

    updateMessage(
      id: Int!
      values: UpdateMessageValues!
    ): ChatMessage!
  }

  input UpdateMessageValues {
    message: String!
  }

  type ChatMessage {
    id: Int!
    message: String
    senderUser: User
    recipientUser: User
    profileConnectionId: Int!
    isSystemMessage: Boolean
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }

  enum MessageUserRole {
    SENDER
    RECIPIENT
    NOT_DEFINED # for system messages
  }
`;
