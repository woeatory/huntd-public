import { Models } from '@/models';
import { JobExperienceByIdLoader } from '@/modules/jobExperience/jobExperience.loaders/JobExperienceById.loader';

export const initJobExperienceLoaders = (models: Models) => ({
  jobExperienceById: new JobExperienceByIdLoader(models),
});
