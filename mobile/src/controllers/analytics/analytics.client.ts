import { AmplitudeClient } from '@/controllers/analytics/amplitude.client';

export class AnalyticsClient {
  static amplitudeClient: AmplitudeClient;

  static getInstance() {
    if (!this.amplitudeClient) {
      this.amplitudeClient = new AmplitudeClient();
    }

    return {
      amplitude: this.amplitudeClient,
    };
  }

  static async logEvent(event: string, options: Record<string, any> = {}) {
    const { amplitude } = this.getInstance();

    await amplitude.logEvent(event, options);
  }

  static async identify(id: string, properties: Record<string, any>) {
    const { amplitude } = this.getInstance();

    await amplitude.identify(id, properties);
  }

  static async clear() {
    const { amplitude } = this.getInstance();

    await amplitude.clear();
  }
}
