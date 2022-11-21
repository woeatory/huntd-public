import gql from 'graphql-tag';

export const SPECIALIZATION_BASE_FRAGMENT = gql`
  fragment SpecializationBase on Specialization {
    id
    name
  }
`;
