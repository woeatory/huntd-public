import { Op, WhereOptions } from 'sequelize';

export enum CandidateProfileStatusEnum {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum TopCandidatesParams {
  limit = 20,
  achievementsIlikeQuery = '%‎%', // there is an empty character between percents, quick way that was suggested by Dima Panchuk
}
export interface CandidateProfileSearchParams {
  cities?: string[];
  countries?: string[];
  locations?: string[];
  specializations?: string[];
  salaryFrom?: number;
  salaryTo?: number;
  timezoneFrom?: number;
  timezoneTo?: number;
  timezoneReverseMode: boolean;
  searchQuery?: string;
  experienceIds?: number[];
  englishLevelIds?: number[];
  employmentTypesIds?: number[];
  technologiesIds?: number[];
}

export interface PublicProfilesWhere {
  candidateProfileCities?: WhereOptions
  '$specialization.name$'?: {
    [Op.in]: string[]
  }
  '$candidateProfileTechnologies.technology_id$'?: {
    [Op.in]: number[]
  }
  '$candidateProfileSpecializations.specialization.name$'?: {
    [Op.in]: string[]
  }
  '$candidateProfileEmploymentTypes.employment_type_id$'?: {
    [Op.in]: number[]
  }
  englishLevelId?: {
    [Op.in]: number[]
  }
  jobExperienceId?: {
    [Op.in]: number[]
  } | {
    [Op.gte]: number
  }
  salary?: {
    [Op.lte]?: number
    [Op.gte]?: number
    [Op.between]?: number[]
  }
}
