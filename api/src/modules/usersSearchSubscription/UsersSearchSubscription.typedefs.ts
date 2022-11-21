import { EmploymentType } from '@/models/EmploymentType';
import { Technology } from '@/models/Technology';
import { JobExperience } from '@/models/JobExperience';
import { EnglishLevel } from '@/models/EnglishLevel';

export interface StringifiedSearchParams {
  employmentTypes?: EmploymentType[]
  technologies?: Technology[]
  jobExperiences?: JobExperience[]
  englishLevels?: EnglishLevel[]
}
