import gql from 'graphql-tag';

export const EmploymentLocationSchema = gql`
  extend type Query {
    employmentLocations: [EmploymentLocation!]
  }

  type EmploymentLocation {
    id: Int!
    slug: String!
  }
`;
