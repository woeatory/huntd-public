import getConfig from 'next/config';

export const getApiWsLink = (path?: string): string => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const {
    API_SSL, API_PORT, API_HOST, API_HOST_PUBLIC, API_PATH,
  } = publicRuntimeConfig;
  const isBrowser = typeof window !== 'undefined';

  const config = {
    ssl: API_SSL === 'true',
    port: API_PORT,
    hostname: isBrowser ? API_HOST_PUBLIC : API_HOST,
  };

  const {
    ssl, hostname, port,
  } = config;

  const protocol = `ws${(ssl && isBrowser) ? 's' : ''}`;
  const apiPort = (ssl && isBrowser) ? 443 : port;

  return `${protocol}://${hostname}:${apiPort}/${path || `${API_PATH}-ws`}`;
};
