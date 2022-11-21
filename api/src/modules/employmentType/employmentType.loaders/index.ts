import { Models } from '@/models';
import { EmploymentTypeByCandidateProfileIdLoader } from '@/modules/employmentType/employmentType.loaders/EmploymentTypeByCandidateProfileId.loader';
import { EmploymentTypesByIdLoader } from '@/modules/employmentType/employmentType.loaders/EmploymentTypesById.loader';

export const initEmploymentTypeLoaders = (models: Models) => ({
  employmentTypeByCandidateProfileId:
    new EmploymentTypeByCandidateProfileIdLoader(models),
  employmentTypesById: new EmploymentTypesByIdLoader(models),
});
