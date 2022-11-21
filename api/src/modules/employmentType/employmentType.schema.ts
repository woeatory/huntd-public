import gql from 'graphql-tag';

export const EmploymentTypeSchema = gql`
  extend type Query {
    employmentTypes: [EmploymentType!]
  }

  type EmploymentType {
    id: Int!
    slug: String!
  }
`;
