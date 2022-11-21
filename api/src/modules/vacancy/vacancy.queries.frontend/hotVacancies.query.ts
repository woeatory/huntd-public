import gql from 'graphql-tag';
import { VACANCY_BASE_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyBase.fragment';
import { VACANCY_ENGLISH_LEVEL_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyEnglishLevel.fragment';
import { VACANCY_JOB_EXPERIENCE_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyJobExperience.fragment';
import { VACANCY_SPECIALIZATION_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancySpecializations.fragment';
import { VACANCY_TECHNOLOGIES_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/vacancyTechnologies.fragment';
import { COMPANY_LOGO_FRAGMENT } from '@/modules/vacancy/vacancy.fragments.frontend/companyLogo.fragment';

export const HOT_VACANCIES_QUERY = gql`
  query hotVacancies {
    hotVacancies {
      ...VacancyBase
      ...VacancyEnglishLevel
      ...VacancyJobExperience
      ...VacancySpecializations
      ...CompanyLogo
    }
  }
  ${VACANCY_BASE_FRAGMENT}
  ${VACANCY_ENGLISH_LEVEL_FRAGMENT}
  ${VACANCY_JOB_EXPERIENCE_FRAGMENT}
  ${VACANCY_SPECIALIZATION_FRAGMENT}
  ${VACANCY_TECHNOLOGIES_FRAGMENT}
  ${COMPANY_LOGO_FRAGMENT}
`;
