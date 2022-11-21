import gql from 'graphql-tag';

export const EnglishLevelSchema = gql`
  extend type Query {
    englishLevels: [EnglishLevel!]
  }

  type EnglishLevel {
    id: Int!
    slug: String!
  }
`;
