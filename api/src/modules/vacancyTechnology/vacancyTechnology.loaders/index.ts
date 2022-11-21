import { Models } from '@/models';
import { TechnologyByVacancyIdLoader } from '@/modules/vacancyTechnology/vacancyTechnology.loaders/TechnologyByVacancyId.loader';

export const initVacancyTechnologyLoaders = (models: Models) => ({
  technologyByVacancyId:
  new TechnologyByVacancyIdLoader(models),
});
