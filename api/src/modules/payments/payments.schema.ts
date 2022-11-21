import gql from 'graphql-tag';

export const PaymentsSchema = gql`
  extend type Mutation {
    sendPaymentRequest(
      profileConnectionId: Int!
      paymentAmount: Int!
      candidateSlug: String!
    ): ProfileConnection!
  }
`;
