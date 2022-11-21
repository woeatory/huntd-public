import gql from 'graphql-tag';

export const FeedbacksSchema = gql`
  extend type Mutation {
    sendFeedback(
      title: String!
      body: String
    ): Boolean!
  }
`;
