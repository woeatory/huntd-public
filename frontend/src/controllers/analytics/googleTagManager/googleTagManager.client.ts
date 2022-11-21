import { createLogger } from '@/controllers/logger/logger.client';

let logger: ReturnType<typeof createLogger> | null = null;

const gtmLogger = () => {
  if (!logger) {
    logger = createLogger({ name: 'Google Tag Manager' });
  }

  return logger;
};

const sendGTMEvent = (event: string, data: Record<string, any> = {}) => {
  try {
    window.dataLayer.push({
      event,
      ...data,
    });
  } catch (e) {
    gtmLogger().warning(`Error sending event "${event}"`, e.message);
  }
};

export const googleTagManager = {
  sendEvent: sendGTMEvent,
};
