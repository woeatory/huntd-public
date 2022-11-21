import gql from 'graphql-tag';
import { SPECIALIZATION_BASE_FRAGMENT } from '@/modules/specialization/specialization.fragments.frontend/specializationBase.fragment';

export const VACANCY_SPECIALIZATION_FRAGMENT = gql`
  fragment VacancySpecializations on Vacancy {
    specializations {
      ...SpecializationBase
    }
  }
  ${SPECIALIZATION_BASE_FRAGMENT}
`;
