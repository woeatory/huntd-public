import gql from 'graphql-tag';
import { ENGLISH_LEVEL_BASE_FRAGMENT } from '@/modules/englishLevel/englishLevel.fragments.mobile/englishLevelBase.fragment';

export const CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT = gql`
  fragment CandidateProfileEnglishLevel on CandidateProfile {
    englishLevel {
      ...EnglishLevelBase
    }
  }
  ${ENGLISH_LEVEL_BASE_FRAGMENT}
`;
