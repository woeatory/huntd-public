import gql from 'graphql-tag';

export const TechnologySchema = gql`
  extend type Query {
    technologiesByNames(names: [String!]!): [Technology!]
    technologies(query: String, requiredTechnologiesIds: [Int!]): [Technology!]
  }
  extend type Mutation {
    createTechnology(name: String!): Technology!
    createTechnologies(slugs: [String!]): [Technology!]
  }

  type Technology {
    id: Int!
    name: String!
  }
`;
