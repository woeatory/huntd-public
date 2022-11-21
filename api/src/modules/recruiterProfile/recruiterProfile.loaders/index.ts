import { Models } from '@/models';
import { LatestRecruiterProfileByUserIdLoader } from '@/modules/recruiterProfile/recruiterProfile.loaders/LatestRecruiterProfileByUserIdLoader';
import { RecruiterProfileByIdLoader } from '@/modules/recruiterProfile/recruiterProfile.loaders/RecruiterProfileByIdLoader';

export const initRecruiterProfileLoaders = (models: Models) => ({
  latestRecruiterProfileByUserId: new LatestRecruiterProfileByUserIdLoader(
    models,
  ),
  recruiterProfileById: new RecruiterProfileByIdLoader(models),
});
