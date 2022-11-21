import { Op } from 'sequelize';

export interface CandidateProfileCityInput {
  cityId: string
  cityName: string
  cityTimezone?: number
  cityCountrySlug?: string
  cityCountryName?: string
  type: CityTypes
}

export interface CandidateProfileCitiesClause {
  cityName: {
    [Op.in]: string[]
  }
  type: CityTypes
}

export enum CityTypes {
  Office = 'OFFICE_CITY',
  Candidate = 'CANDIDATE_CITY',
}
