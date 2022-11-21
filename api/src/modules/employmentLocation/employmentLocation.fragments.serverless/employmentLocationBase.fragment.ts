import gql from 'graphql-tag';

export const EMPLOYMENT_LOCATION_BASE_FRAGMENT = gql`
  fragment EmploymentLocationBase on EmploymentLocation {
    id
    slug
  }
`;
