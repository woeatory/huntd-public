import gql from 'graphql-tag';
import { ENGLISH_LEVEL_BASE_FRAGMENT } from '@/modules/englishLevel/englishLevel.fragments.mobile/englishLevelBase.fragment';

export const ENGLISH_LEVELS_QUERY = gql`
  query englishLevels {
    englishLevels {
      ...EnglishLevelBase
    }
  }
  ${ENGLISH_LEVEL_BASE_FRAGMENT}
`;
