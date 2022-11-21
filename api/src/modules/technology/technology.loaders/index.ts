import { Models } from '@/models';
import { TechnologyByCandidateProfileIdLoader } from '@/modules/technology/technology.loaders/TechnologyByCandidateProfileId.loader';
import { TechnologiesByIdLoader } from '@/modules/technology/technology.loaders/TechnologiesById.loader';

export const initTechnologyLoaders = (models: Models) => ({
  technologyByCandidateProfileId:
    new TechnologyByCandidateProfileIdLoader(models),
  technologiesById:
    new TechnologiesByIdLoader(models),
});
