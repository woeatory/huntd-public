import * as Amplitude from 'expo-analytics-amplitude';
import Config from 'react-native-config';

type EventOptions = Record<string, any>;
type UserProperties = Record<string, any>;

export class AmplitudeClient {
  private readonly API_KEY = Config.AMPLITUDE_KEY;

  async initialize() {
    await Amplitude.initializeAsync(this.API_KEY);
  }

  async logEvent(event: string, options: EventOptions = {}) {
    await this.initialize();

    const properties = { ...options, device: 'mobile' };

    await Amplitude.logEventWithPropertiesAsync(event, properties);
  }

  async identify(id: string, properties: UserProperties) {
    await this.initialize();

    await Amplitude.setUserIdAsync(id);
    await Amplitude.setUserPropertiesAsync(properties);
  }

  async clear() {
    await this.initialize();

    await Amplitude.clearUserPropertiesAsync();
  }

}
