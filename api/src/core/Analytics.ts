import { AnalyticsEvents } from '@/core/gateways/Analytics/Analytics.constants';

export interface SendEventOptions {
  event: string;
  userEmail: string;
  data: Record<string, any>;
}

export abstract class Analytics {
  abstract events: typeof AnalyticsEvents;

  abstract sendEvent(options: SendEventOptions): void
}
