import { Models } from '@/models';
import { ProfileConnectionUserMetaByConnectionAndUserIdLoader } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.loaders/ProfileConnnectionUserMetaByUserId.loader';

export const initProfileConnectionUserMetaLoaders = (models: Models) => ({
  profileConnectionUserMetaByConnectionAndUserId:
    new ProfileConnectionUserMetaByConnectionAndUserIdLoader(models),
});
