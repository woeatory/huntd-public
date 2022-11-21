import gql from 'graphql-tag';
import { FEATURE_BASE_FRAGMENT } from '@/modules/feature/feature.fragments.api/feature.fragment';

export const FEATURE_QUERY = gql`
  query feature($name: String!) {
    feature(name: $name) {
      ...FeatureBase
    }
  }
  ${FEATURE_BASE_FRAGMENT}
`;
