import gql from 'graphql-tag';

export const JobExperienceSchema = gql`
  extend type Query {
    jobExperiences: [JobExperience!]
  }

  type JobExperience {
    id: Int!
    slug: String!
  }
`;
