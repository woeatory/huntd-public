import gql from 'graphql-tag';
import { ENGLISH_LEVEL_BASE_FRAGMENT } from '@/modules/englishLevel/englishLevel.fragments.frontend/englishLevelBase.fragment';

export const VACANCY_ENGLISH_LEVEL_FRAGMENT = gql`
  fragment VacancyEnglishLevel on Vacancy {
    englishLevel {
      ...EnglishLevelBase
    }
  }
  ${ENGLISH_LEVEL_BASE_FRAGMENT}
`;
