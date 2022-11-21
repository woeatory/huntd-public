import gql from 'graphql-tag';

export const CITY_BASE_FRAGMENT = gql`
  fragment CandidateProfileCityBase on CandidateProfileCity {
    id
    cityId
    cityName
    cityCountryName
    cityCountrySlug
    cityTimezone
    type
  }
`;
