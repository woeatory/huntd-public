export const getDeviceInfo = () => {
  const result = {
    environment: '',
    userAgent: '',
  };

  try {
    result.environment = process.browser ? 'browser' : 'server';
  } catch (e) {
    // do nothing
  }

  try {
    result.userAgent = window.navigator.userAgent;
  } catch (e) {
    // do nothing
  }

  return result;
};
