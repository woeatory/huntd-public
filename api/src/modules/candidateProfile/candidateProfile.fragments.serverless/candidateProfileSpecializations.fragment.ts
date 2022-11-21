import gql from 'graphql-tag';
import { SPECIALIZATION_BASE_FRAGMENT } from '@/modules/specialization/specialization.fragments.serverless/specializationBase.fragment';

export const CANDIDATE_PROFILE_SPECIALIZATIONS_FRAGMENT = gql`
  fragment CandidateProfileSpecializations on CandidateProfile {
    specializations {
      ...SpecializationBase
    }
  }
  ${SPECIALIZATION_BASE_FRAGMENT}
`;
