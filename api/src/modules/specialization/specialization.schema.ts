import gql from 'graphql-tag';

export const SpecializationSchema = gql`
  extend type Query {
    specializations(query: String): [Specialization!]
  }

  type Specialization {
    id: Int!
    name: String!
  }
`;
