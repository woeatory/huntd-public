import { Models } from '@/models';
import { SpecializationByIdLoader } from '@/modules/specialization/specialization.loaders/SpecializationById.loader';
import { SpecializationsByCandidateProfileIdLoader } from './SpecializationsByCandidateProfileId.loader';

export const initSpecializationLoaders = (models: Models) => ({
  specializationById: new SpecializationByIdLoader(models),
  specializationsByCandidateProfileId:
    new SpecializationsByCandidateProfileIdLoader(models),
});
