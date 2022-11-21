import { analytics } from '@/controllers/analytics/analytics.client';
import { User } from '@/controllers/graphql/generated';

export const processUserAnalytics = (user: User) => {
  analytics.setUserId(user?.email || '');
  analytics.setUserProperties(
    analytics.getUserEngagementFields(user),
  );
};
