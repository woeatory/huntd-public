import gql from 'graphql-tag';

export const UserMessagesTemplateSchema = gql`
  type UserTemplateMessage {
    id: Int!
    messageType: PrimaryProfile
    messageTitle: String!
    messageBody: String!
    createdAt: GraphQLDateTime
  }

  input UpdateTemplateMessageValues {
    messageTitle: String
    messageBody: String
  }

  extend type Mutation {
    createMessageTemplate(
      userId: Int!
      messageType: PrimaryProfile!
      messageTitle: String!
      messageBody: String!
    ): UserTemplateMessage!
    deleteMessageTemplate(
      id: Int!
      userId: Int
    ): Boolean!
    updateMessageTemplate(
      id: Int!
      userId: Int
      values: UpdateTemplateMessageValues!
    ): UserTemplateMessage!
  }
`;
