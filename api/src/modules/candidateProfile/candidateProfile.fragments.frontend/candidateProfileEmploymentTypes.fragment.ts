import gql from 'graphql-tag';
import { EMPLOYMENT_TYPE_BASE_FRAGMENT } from '@/modules/employmentType/employmentType.fragments.frontend/employmentTypeBase.fragment';

export const CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT = gql`
  fragment CandidateProfileEmploymentTypes on CandidateProfile {
    employmentTypes {
      ...EmploymentTypeBase
    }
  }
  ${EMPLOYMENT_TYPE_BASE_FRAGMENT}
`;
