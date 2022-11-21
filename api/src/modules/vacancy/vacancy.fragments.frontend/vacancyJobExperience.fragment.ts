import gql from 'graphql-tag';
import { JOB_EXPERIENCE_BASE_FRAGMENT } from '@/modules/jobExperience/jobExperience.fragments.frontend/jobExperienceBase.fragment';

export const VACANCY_JOB_EXPERIENCE_FRAGMENT = gql`
  fragment VacancyJobExperience on Vacancy {
    jobExperience {
      ...JobExperienceBase
    }
  }
  ${JOB_EXPERIENCE_BASE_FRAGMENT}
`;
