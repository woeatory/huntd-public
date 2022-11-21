import { gql } from '@apollo/client';

export const FlashMessageSchema = gql`
  extend type Query {
    visibleMessages: [FlashMessage!]!
  }

  input CtaInput {
    title: String!
    link: String!
  }

  type Cta {
    title: String!
    link: String!
  }

  extend type Mutation {
    postMessage(
      type: FlashMessageType!
      heading: String!
      text: String!
      cta: CtaInput
    ): Int!

    deleteMessage(id: Int!): Int!
  }
  enum FlashMessageType {
    INFO
    SUCCESS
    WARNING
    ERROR
  }

  type FlashMessage {
    id: Int!
    type: FlashMessageType!
    heading: String!
    text: String!
    cta: Cta
  }
`;
