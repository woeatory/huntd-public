import { Models } from '@/models';
import { EmploymentLocationByCandidateProfileIdLoader } from '@/modules/employmentLocation/employmentLocation.loaders/EmploymentLocationByCandidateProfileId.loader';
import { EmploymentLocationsByIdLoader } from '@/modules/employmentLocation/employmentLocation.loaders/EmploymentLocationsById.loader';

export const initEmploymentLocationLoaders = (models: Models) => ({
  employmentLocationByCandidateProfileId:
    new EmploymentLocationByCandidateProfileIdLoader(models),
  employmentLocationsById: new EmploymentLocationsByIdLoader(models),
});
