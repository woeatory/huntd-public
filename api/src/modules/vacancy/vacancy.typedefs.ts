export const HOT_VACANCIES_COUNT = 4;

export interface VacanciesOptions {
  keywords: string[]
}

export interface VacanciesByCompanyOptions {
  companyName: string
}

export interface AddVacanciesLogoOptions {
  companyNames: string[];
}

export enum VacancyStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum VacancyTypeEnum {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export enum VacancyCategoryEnum {
  UsOnly = 'US_ONLY',
  EuropeOnly = 'EUROPE_ONLY',
  Worldwide = 'WORLDWIDE',
}

export interface SourcedVacancy {
  sourceId: number
  userId: number
  applyLink: string
  jobTitle: string
  jobDescription: string
  jobType: VacancyTypeEnum
  jobCategory: VacancyCategoryEnum
  status: VacancyStatusEnum
  companyName: string
  salaryFrom?: number
  salaryTo?: number
}

export type VacancySalaryData = {
  maxSalary: number;
  averageMinSalary: number;
  averageSalary: number;
}
