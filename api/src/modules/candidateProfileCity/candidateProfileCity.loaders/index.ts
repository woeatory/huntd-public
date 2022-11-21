import { Models } from '@/models';
import { CandidateProfileCityByCandidateProfileIdLoader } from '@/modules/candidateProfileCity/candidateProfileCity.loaders/candidateProfileCityByCandidateProfileId.loader';

export const initCandidateProfileCityLoaders = (models: Models) => ({
  candidateProfileCityByCandidateProfileId:
    new CandidateProfileCityByCandidateProfileIdLoader(models),
});
