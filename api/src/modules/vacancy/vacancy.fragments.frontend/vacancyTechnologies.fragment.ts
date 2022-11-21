import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.frontend/technologyBase.fragment';

export const VACANCY_TECHNOLOGIES_FRAGMENT = gql`
  fragment VacancyTechnologies on Vacancy {
    technologies {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
