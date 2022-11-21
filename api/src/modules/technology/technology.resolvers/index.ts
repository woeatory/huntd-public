import { technologiesResolver } from '@/modules/technology/technology.resolvers/technologies.resolver';
import { createTechnologyResolver } from '@/modules/technology/technology.resolvers/createTechnolgy.resolver';
import { createTechnologiesResolver } from '@/modules/technology/technology.resolvers/createTechnologies.resolver';
import { technologiesByNamesResolver } from '@/modules/technology/technology.resolvers/getTechnologiesByNames.resolver';

export const TechnologyResolvers = {
  Query: {
    technologies: technologiesResolver,
    technologiesByNames: technologiesByNamesResolver,
  },
  Mutation: {
    createTechnology: createTechnologyResolver,
    createTechnologies: createTechnologiesResolver,
  },
};
