import gql from 'graphql-tag';
import { EMPLOYMENT_LOCATION_BASE_FRAGMENT } from '@/modules/employmentLocation/employmentLocation.fragments.api/employmentLocationBase.fragment';

export const CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT = gql`
  fragment CandidateProfileEmploymentLocations on CandidateProfile {
    employmentLocations {
      ...EmploymentLocationBase
    }
  }
  ${EMPLOYMENT_LOCATION_BASE_FRAGMENT}
`;
