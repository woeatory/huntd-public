export enum UsersSearchSubscriptionErrors {
  SubscriptionNotFound = 'subscription_not_found',
}

export enum SubscriptionUrlRoutes {
  AnyCity = 'any-city',
  AnyCountry = 'any-country',
  Technologies = 'technologies',
  SalaryFrom = 'salaryFrom',
  SalaryTo = 'salaryTo',
  TimezoneFrom = 'timezoneFrom',
  TimezoneTo = 'timezoneTo',
  EnglishLevel = 'englishLevels',
  JobExperience = 'jobExperience',
  EmploymentType = 'employmentTypes',
  TimezoneReverseMode = 'timezoneReverseMode',
  SalaryMultiplier = 'salaryMultiplier',
  CandidateLocation = 'candidateLocation'
}

export enum LocationFilterType {
  CityCountry = 'city-country',
  Timezone = 'timezone',
}

export const CandidatesRoute = '/candidates';
