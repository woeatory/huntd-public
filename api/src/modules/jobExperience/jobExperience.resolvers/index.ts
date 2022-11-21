import { jobExperiencesResolver } from '@/modules/jobExperience/jobExperience.resolvers/jobExperiences.resolver';

export const JobExperienceResolvers = {
  Query: {
    jobExperiences: jobExperiencesResolver,
  },
};
