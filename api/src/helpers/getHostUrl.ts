export const getHostUrl = (): string => {
  const hostname = process.env.API_HOST_PUBLIC;
  const protocol = `http${(process.env.API_SSL === 'true') ? 's' : ''}`;

  return `${protocol}://${hostname}`;
};
