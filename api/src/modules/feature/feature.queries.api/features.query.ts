import gql from 'graphql-tag';
import { FEATURE_BASE_FRAGMENT } from '@/modules/feature/feature.fragments.api/feature.fragment';

export const FEATURES_QUERY = gql`
  query features {
    features {
      ...FeatureBase
    }
  }
  ${FEATURE_BASE_FRAGMENT}
`;
