import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import { App } from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import { pluginRoutes } from './utils/constants';

export default (strapi) => {
  const pluginDescription = pluginPkg.strapi.description
    || pluginPkg.description;
  const { icon } = pluginPkg.strapi;
  const { name } = pluginPkg.strapi;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    preventComponentRendering: false,
    trads,
    menu: {
      pluginsSectionLinks: [
        {
          destination: pluginRoutes.candidates,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: name,
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
