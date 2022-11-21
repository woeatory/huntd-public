import { Models } from '@/models';
import { ProfileWorkPlaceByCandidateProfileIdLoader } from '@/modules/workPlace/workPlace.loaders/workPlaceByCandidateProfileId.loader';

export const initCandidateProfileWorkPlaceLoaders = (models: Models) => ({
  candidateProfileWorkPlaceByCandidateProfileId:
    new ProfileWorkPlaceByCandidateProfileIdLoader(models),
});
