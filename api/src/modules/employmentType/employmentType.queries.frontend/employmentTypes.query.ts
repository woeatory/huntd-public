import gql from 'graphql-tag';
import { EMPLOYMENT_TYPE_BASE_FRAGMENT } from '@/modules/employmentType/employmentType.fragments.frontend/employmentTypeBase.fragment';

export const EMPLOYMENT_TYPES_QUERY = gql`
  query employmentTypes {
    employmentTypes {
      ...EmploymentTypeBase
    }
  }
  ${EMPLOYMENT_TYPE_BASE_FRAGMENT}
`;
