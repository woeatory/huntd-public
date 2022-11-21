import gql from 'graphql-tag';

export const TECHNOLOGY_BASE_FRAGMENT = gql`
  fragment TechnologyBase on Technology {
    id
    name
  }
`;
