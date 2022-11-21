import gql from 'graphql-tag';

export const CandidateProfileCitySchema = gql`
  input CandidateProfileCityInput {
    cityId: String!
    cityName: String!
    cityTimezone: Int
    cityCountrySlug: String
    cityCountryName: String
    type: CityTypes
  }

  type CandidateProfileCity {
    id: Int!
    cityId: String!
    cityName: String!
    cityTimezone: Int
    cityCountrySlug: String
    cityCountryName: String
    type: CityTypes!
  }

  enum CityTypes {
    CANDIDATE_CITY
    OFFICE_CITY
  }
`;
