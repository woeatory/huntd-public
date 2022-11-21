import { CandidateProfilesByUserIdLoader } from '@/modules/candidateProfile/candidateProfile.loaders/CandidateProfilesByUserIdLoader';
import { Models } from '@/models';
import { LatestCandidateProfileByUserIdLoader } from '@/modules/candidateProfile/candidateProfile.loaders/LatestCandidateProfileByUserIdLoader';
import { CandidateProfileByIdLoader } from '@/modules/candidateProfile/candidateProfile.loaders/CandidateProfileByIdLoader';

export const initCandidateProfileLoaders = (models: Models) => ({
  candidateProfilesByUserId: new CandidateProfilesByUserIdLoader(models),
  latestCandidateProfileByUserId: new LatestCandidateProfileByUserIdLoader(
    models,
  ),
  candidateProfileById: new CandidateProfileByIdLoader(models),
});
