import gql from 'graphql-tag';

export const EMPLOYMENT_TYPE_BASE_FRAGMENT = gql`
  fragment EmploymentTypeBase on EmploymentType {
    id
    slug
  }
`;
