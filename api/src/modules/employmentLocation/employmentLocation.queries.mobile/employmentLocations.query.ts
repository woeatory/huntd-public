import gql from 'graphql-tag';
import { EMPLOYMENT_LOCATION_BASE_FRAGMENT } from '@/modules/employmentLocation/employmentLocation.fragments.mobile/employmentLocationBase.fragment';

export const EMPLOYMENT_LOCATIONS_QUERY = gql`
  query employmentLocations {
    employmentLocations {
      ...EmploymentLocationBase
    }
  }
  ${EMPLOYMENT_LOCATION_BASE_FRAGMENT}
`;
