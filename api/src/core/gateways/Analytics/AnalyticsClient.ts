import * as Amplitude from '@amplitude/node';
import { Analytics, SendEventOptions } from '@/core/Analytics';
import { AnalyticsEvents } from '@/core/gateways/Analytics/Analytics.constants';

export class AnalyticsClient extends Analytics {
  private readonly amplitude = Amplitude.init(process.env.AMPLITUDE_API_KEY);

  events = AnalyticsEvents;

  private sendAmplitude(options: SendEventOptions) {
    const { event, userEmail, data } = options;

    this.amplitude.logEvent({
      event_type: event,
      user_id: userEmail,
      event_properties: data,
    });
  }

  sendEvent(options: SendEventOptions) {
    this.sendAmplitude(options);
  }
}
