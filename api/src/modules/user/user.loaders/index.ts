import { Models } from '@/models';
import { UserByIdLoader } from '@/modules/user/user.loaders/UserByIdLoader';
import { UserBaseByIdLoader } from '@/modules/user/user.loaders/UserBaseByIdLoader';

export const initUserLoaders = (models: Models) => ({
  userById: new UserByIdLoader(models),
  userBaseByIdLoader: new UserBaseByIdLoader(models),
});
