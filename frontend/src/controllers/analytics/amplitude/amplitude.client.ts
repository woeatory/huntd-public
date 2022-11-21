import { getInstance, Callback } from 'amplitude-js';
import getConfig from 'next/config';
import { createLogger } from '@/controllers/logger/logger.client';

interface Helpers {
  getInstance: typeof getInstance;
}

let logger: ReturnType<typeof createLogger> | null = null;
let amplitudeInstance: Helpers | null = null;

const amplitudeLogger = () => {
  if (!logger) {
    logger = createLogger({ name: 'Amplitude' });
  }

  return logger;
};

const amplitudeCallback = (callback: (instance: Helpers) => void) => {
  if (!amplitudeInstance) {
    setTimeout(() => amplitudeCallback(callback), 2000);

    return;
  }

  callback(amplitudeInstance);
};

const setAmplitudeUserId = (userId: string) => {
  amplitudeCallback((amplitude) => {
    try {
      amplitude.getInstance().setUserId(userId);
    } catch (e) {
      amplitudeLogger().warning(e.message);
    }
  });
};

const setAmplitudeUserProperties = (properties: Record<string, any>) => {
  amplitudeCallback((amplitude) => {
    try {
      amplitude.getInstance().setUserProperties(properties);
    } catch (e) {
      amplitudeLogger().warning(e.message);
    }
  });
};

const sendAmplitudeData = (
  type: string,
  data: {[key: string]: any} = {},
  callback?: Callback,
) => {
  amplitudeCallback((amplitude) => {
    try {
      amplitude.getInstance().logEvent(type, data, callback);
    } catch (e) {
      amplitudeLogger().warning(e.message);
    }
  });
};

const initAmplitude = async () => {
  if (amplitudeInstance) {
    return;
  }

  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { AMPLITUDE_API_KEY, API_HOST_PUBLIC } = publicRuntimeConfig;
  const { default: amplitudeSDK } = await import('amplitude-js');

  amplitudeInstance = amplitudeSDK;
  amplitudeInstance.getInstance().init(AMPLITUDE_API_KEY, '', {
    includeGclid: true,
    includeReferrer: true,
    includeUtm: true,
    apiEndpoint: `${API_HOST_PUBLIC}/amplitude`,
  });
};

export const amplitude = {
  init: initAmplitude,
  sendEvent: sendAmplitudeData,
  setUserProperties: setAmplitudeUserProperties,
  setUserId: setAmplitudeUserId,
};
