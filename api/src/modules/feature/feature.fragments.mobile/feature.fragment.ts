import gql from 'graphql-tag';

export const FEATURE_BASE_FRAGMENT = gql`
  fragment FeatureBase on Feature {
    id
    name
    status
  }
`;
