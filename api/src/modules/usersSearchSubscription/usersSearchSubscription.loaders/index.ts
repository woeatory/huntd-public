import { Models } from '@/models';
import { SubscriptionsByUserIdLoader } from '@/modules/usersSearchSubscription/usersSearchSubscription.loaders/SubscriptionsByUserId.loader';
import { SubscriptionsByIdLoader } from '@/modules/usersSearchSubscription/usersSearchSubscription.loaders/SubscriptionsById.loader';

export const initUsersSearchSubscriptionLoaders = (models: Models) => ({
  subscriptionsByUserId: new SubscriptionsByUserIdLoader(models),
  subscriptionsById: new SubscriptionsByIdLoader(models),
});
