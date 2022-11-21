import { createVacanciesSourceResolver } from './createVacanciesSource.resolver';
import { vacanciesSourcesResolver } from './vacanciesSources.resolver';
import { createMultipleVacanciesSourcesResolver } from './createMultipleVacanciesSources.resolver';

export const VacanciesSourceResolvers = {
  Query: {
    vacanciesSources: vacanciesSourcesResolver,
  },
  Mutation: {
    createVacanciesSource: createVacanciesSourceResolver,
    createMultipleVacanciesSources: createMultipleVacanciesSourcesResolver,
  },
};
