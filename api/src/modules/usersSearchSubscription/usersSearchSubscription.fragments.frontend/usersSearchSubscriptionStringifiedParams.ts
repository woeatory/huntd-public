import gql from 'graphql-tag';
import { EMPLOYMENT_TYPE_BASE_FRAGMENT } from '@/modules/employmentType/employmentType.fragments.frontend/employmentTypeBase.fragment';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.frontend/technologyBase.fragment';
import { JOB_EXPERIENCE_BASE_FRAGMENT } from '@/modules/jobExperience/jobExperience.fragments.frontend/jobExperienceBase.fragment';
import { ENGLISH_LEVEL_BASE_FRAGMENT } from '@/modules/englishLevel/englishLevel.fragments.frontend/englishLevelBase.fragment';

export const USERS_SEARCH_SUBSCRIPTION_STRINGIFIED_PARAMS_FRAGMENT = gql`
  fragment UsersSearchSubscriptionStringifiedParams on UsersSearchSubscription {
    stringifiedSearchParams {
      id
      employmentTypes {
        ...EmploymentTypeBase
      }
      technologies {
        ...TechnologyBase
      }
      jobExperiences {
        ...JobExperienceBase
      }
      englishLevels {
        ...EnglishLevelBase
      }
    }
  }
  ${EMPLOYMENT_TYPE_BASE_FRAGMENT}
  ${TECHNOLOGY_BASE_FRAGMENT}
  ${JOB_EXPERIENCE_BASE_FRAGMENT}
  ${ENGLISH_LEVEL_BASE_FRAGMENT}
`;
