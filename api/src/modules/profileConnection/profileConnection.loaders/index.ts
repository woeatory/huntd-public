import { Models } from '@/models';
import { ProfileConnectionByProfilesIdLoader } from '@/modules/profileConnection/profileConnection.loaders/ProfileConnectionByProfilesId.loader';
import { ProfileConnectionsByConnectionIdLoader } from './ProfileConnectionsByConnectionId.loader';
import { ProfileConnectionsByCandidateUserIdLoader } from './ProfileConnectionsByCandidateUserId.loader';

export const initProfileConnectionLoaders = (models: Models) => ({
  profileConnectionByProfilesId: (
    new ProfileConnectionByProfilesIdLoader(models)
  ),
  profileConnectionsByConnectionId: (
    new ProfileConnectionsByConnectionIdLoader(models)
  ),
  profileConnectionsByCandidateUserId: (
    new ProfileConnectionsByCandidateUserIdLoader(models)
  ),
});
