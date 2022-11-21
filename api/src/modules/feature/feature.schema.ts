import { gql } from 'apollo-server-express';

export const FeatureSchema = gql`
  extend type Query {
    feature(name: String!): Feature
    features: [Feature!]
  }
  type Feature {
    id: Int!
    name: String!
    status: FeatureStatus!
  }

  enum FeatureStatus {
    ENABLED
    DISABLED
  }
`;
