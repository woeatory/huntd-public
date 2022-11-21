import gql from 'graphql-tag';
import { SPECIALIZATION_BASE_FRAGMENT } from '@/modules/specialization/specialization.fragments.api/specializationBase.fragment';

export const CANDIDATE_PROFILE_SPECIALIZATION_FRAGMENT = gql`
  fragment CandidateProfileSpecialization on CandidateProfile {
    specialization {
      ...SpecializationBase
    }
  }
  ${SPECIALIZATION_BASE_FRAGMENT}
`;
