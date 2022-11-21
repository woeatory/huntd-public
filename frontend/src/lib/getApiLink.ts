import getConfig from 'next/config';

export const getPublicHost = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { API_HOST_PUBLIC } = publicRuntimeConfig;

  return `https://${API_HOST_PUBLIC}`;
};

export const getApiLink = (path?: string): string => {
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

  const protocol = `http${(ssl && isBrowser) ? 's' : ''}`;
  const apiPort = (ssl && isBrowser) ? 443 : port;

  return `${protocol}://${hostname}:${apiPort}/${path || API_PATH}`;
};
