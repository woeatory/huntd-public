import gql from 'graphql-tag';
import { JOB_EXPERIENCE_BASE_FRAGMENT } from '@/modules/jobExperience/jobExperience.fragments.mobile/jobExperienceBase.fragment';

export const JOB_EXPERIENCES_QUERY = gql`
  query jobExperiences {
    jobExperiences {
      ...JobExperienceBase
    }
  }
  ${JOB_EXPERIENCE_BASE_FRAGMENT}
`;
