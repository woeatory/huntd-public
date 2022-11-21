import pluginId from '@profile-checker/pluginId';

const home = `/plugins/${pluginId}`;

export const pluginRoutes = {
  home,
  candidates: `${home}/candidates`,
  recruiters: `${home}/recruiters`,
};
