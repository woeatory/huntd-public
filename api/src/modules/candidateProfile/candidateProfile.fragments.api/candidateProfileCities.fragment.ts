import gql from 'graphql-tag';
import { CITY_BASE_FRAGMENT } from '@/modules/candidateProfileCity/candidateProfileCity.fragments.api/candidateProfileCityBase.fragment';

export const CANDIDATE_PROFILE_CITIES_FRAGMENT = gql`
  fragment CandidateProfileCities on CandidateProfile {
    cities {
      ...CandidateProfileCityBase
    }
  }
  ${CITY_BASE_FRAGMENT}
`;
