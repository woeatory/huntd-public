export enum CandidateProfileTabs {
  Speciality = 'speciality',
  JobExpectations = 'job-expectations',
  Experience = 'experience',
  Bio = 'bio',
  Contacts = 'contacts',
}

export enum CandidateProfileMetaItems {
  Location = 'location',
  EmploymentLocation = 'employmentLocation',
  JobExperience = 'jobExperience',
  Salary = 'salary',
  EnglishLevel = 'englishLevel',
}

export interface PublicProfilesWhereClause {
  cities?: string[];
  countries?: string[];
  specializations?: string[];
  salaryFrom?: number;
  salaryTo?: number;
  timezoneFrom?: number;
  timezoneTo?: number;
  searchQuery?: string;
  experienceIds?: number[] | null;
  englishLevelIds?: number[] | null;
  employmentTypesIds?: number[] | null;
  technologiesIds?: number[] | null;
  timezoneReverseMode?: boolean;
}

export interface SystemParamsClause {
  salaryMultiplier?: string;
  candidateLocation?: string;
}
