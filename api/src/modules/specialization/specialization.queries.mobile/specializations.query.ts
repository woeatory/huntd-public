import gql from 'graphql-tag';
import { SPECIALIZATION_BASE_FRAGMENT } from '@/modules/specialization/specialization.fragments.mobile/specializationBase.fragment';

export const SPECIALIZATIONS_QUERY = gql`
  query specialization($query: String) {
    specializations(query: $query) {
      ...SpecializationBase
    }
  }
  ${SPECIALIZATION_BASE_FRAGMENT}
`;
