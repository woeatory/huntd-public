import { cmsGraphqlRequestClient } from '@/controllers/graphql-request/cms.graphql-request.client';
import { SettingsQuery } from '@/controllers/graphql/cms/cms.generated';

let settings: SettingsQuery['setting'] = null;

export const getSettings = async () => {
  if (!settings) {
    const data = await cmsGraphqlRequestClient().settings();

    settings = data.setting;
  }

  if (!settings) {
    throw new Error(`Couldn't get CMS settings`);
  }

  return settings;
};
