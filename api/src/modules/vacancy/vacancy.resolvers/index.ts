import { vacanciesResolver } from '@/modules/vacancy/vacancy.resolvers/vacancies.resolver';
import { vacanciesByCompanyResolver } from '@/modules/vacancy/vacancy.resolvers/vacanciesByCompany.resolver';
import { vacancyEnglishLevelResolver } from '@/modules/vacancy/vacancy.resolvers/vacancyEnglishLevel.resolver';
import { vacancyJobExperienceResolver } from '@/modules/vacancy/vacancy.resolvers/vacancyJobExperience.resolver';
import { vacancyTechnologiesResolver } from '@/modules/vacancy/vacancy.resolvers/vacancyTechnologies.resolver';
import { vacancySpecializationsResolver } from '@/modules/vacancy/vacancy.resolvers/vacancySpecializations.resolver';
import { sendNewVacancyRequestResolver } from '@/modules/vacancy/vacancy.resolvers/sendNewVacancyRequest.resolver';
import { sendNewVacancyApplicationResolver } from '@/modules/vacancy/vacancy.resolvers/sendNewVacancyApplication.resolver';
import { hotVacanciesResolver } from '@/modules/vacancy/vacancy.resolvers/hotVacancies.resolver';
import { companyLogoResolver } from '@/modules/vacancy/vacancy.resolvers/companyLogo.resolver';
import { createSourcedVacanciesResolver } from '@/modules/vacancy/vacancy.resolvers/createSourcedVacancies.resolver';
import { deleteObsoleteSourcedVacanciesResolver } from '@/modules/vacancy/vacancy.resolvers/deleteObsoleteSourcedVacancies';
import { addVacanciesLogoResolver } from '@/modules/vacancy/vacancy.resolvers/addVacanciesLogo.resolver';
import { salariesDataByCategoryResolver } from './salariesDataByCategory.resolver';

export const VacancyResolvers = {
  Query: {
    vacancies: vacanciesResolver,
    vacanciesByCompany: vacanciesByCompanyResolver,
    hotVacancies: hotVacanciesResolver,
    salariesDataByCategory: salariesDataByCategoryResolver,
  },

  Mutation: {
    sendNewVacancyRequest: sendNewVacancyRequestResolver,
    sendNewVacancyApplication: sendNewVacancyApplicationResolver,
    createSourcedVacancies: createSourcedVacanciesResolver,
    deleteObsoleteSourcedVacancies: deleteObsoleteSourcedVacanciesResolver,
    addVacanciesLogo: addVacanciesLogoResolver,
  },

  Vacancy: {
    englishLevel: vacancyEnglishLevelResolver,
    jobExperience: vacancyJobExperienceResolver,
    technologies: vacancyTechnologiesResolver,
    specializations: vacancySpecializationsResolver,
    companyLogo: companyLogoResolver,
  },
};
