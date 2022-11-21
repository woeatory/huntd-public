import { sendNotificationResolver } from '@/modules/notifications/notifications.resolvers/sendNotification.resolver';

export const NotificationsResolvers = {
  Mutation: {
    sendNotification: sendNotificationResolver,
  },
};
