import { User } from '@/controllers/graphql/generated';
import { sourceBuster } from '@/controllers/analytics/sourcebuster/sourcebuster.client';
import { amplitude } from '@/controllers/analytics/amplitude/amplitude.client';
import { googleTagManager } from '@/controllers/analytics/googleTagManager/googleTagManager.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.constants';

const sendEvent = (event: string, data: Record<string, any>) => {
  amplitude.sendEvent(event, data);
  googleTagManager.sendEvent(event, data);
};

const setUserId = (id: string) => {
  amplitude.setUserId(id);
};

const setUserProperties = (properties: Record<string, any>) => {
  amplitude.setUserProperties(properties);
};

const getUserEngagementFields = (user?: User | null) => sourceBuster
  .getUserEngagementFields(user);

const initAnalytics = (user?: User | null) => {
  sourceBuster.init();
  amplitude.init();

  const utmData = getUserEngagementFields(user);

  setUserProperties(utmData);
};

export const analytics = {
  init: initAnalytics,
  sendEvent,
  setUserProperties,
  setUserId,
  getUserEngagementFields,
  events: AnalyticsEvents,
};
