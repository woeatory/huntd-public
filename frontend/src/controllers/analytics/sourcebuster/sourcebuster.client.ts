import sbjs from 'sourcebuster';
import cookie from 'cookie';
import {
  User,
  UserEngagementFieldsFragment,
} from '@/controllers/graphql/generated';
import { createLogger } from '@/controllers/logger/logger.client';

let logger: ReturnType<typeof createLogger> | null = null;

const getClientId = () => {
  const getTrackers = window.ga?.getAll;
  const COOKIE_NAME = '_ga';

  const clientId = getTrackers
    ? getTrackers()[0].get('clientId')
    : cookie.parse(document.cookie)[COOKIE_NAME];

  if (!clientId) {
    return null;
  }

  return clientId;
};

const sbjsLogger = () => {
  if (!logger) {
    logger = createLogger({ name: 'Sourcebuster' });
  }

  return logger;
};

const initSourceBuster = () => {
  sbjs.init({
    domain: 'huntd.tech',
  });

  window.sbjs = sbjs;
};

type EngagementFields = Omit<UserEngagementFieldsFragment, '__typename'>;

interface GetUserEngagementFields {
  (user?: User | null): EngagementFields
}
const getUserEngagementFields: GetUserEngagementFields = (user) => {
  const engagementFields: EngagementFields = {
    fvType: '',
    fvSource: '',
    fvMedium: '',
    fvCampaign: '',
    fvContent: '',
    fvTerm: '',
    lvType: '',
    lvSource: '',
    lvMedium: '',
    lvCampaign: '',
    lvContent: '',
    lvTerm: '',
    gclid: '',
    gClientid: '',
    gIp: '',
    gAgent: '',
  };

  try {
    engagementFields.fvType = user?.fvType ?? sbjs?.get?.first?.typ;
    engagementFields.fvSource = user?.fvSource ?? sbjs?.get?.first?.src;
    engagementFields.fvMedium = user?.fvMedium ?? sbjs?.get?.first?.mdm;
    engagementFields.fvCampaign = user?.fvCampaign ?? sbjs?.get?.first?.cmp;
    engagementFields.fvContent = user?.fvContent ?? sbjs?.get?.first?.cnt;
    engagementFields.fvTerm = user?.fvTerm ?? sbjs?.get?.first?.trm;
    engagementFields.lvType = user?.lvType ?? sbjs?.get?.current?.typ;
    engagementFields.lvSource = user?.lvSource ?? sbjs?.get?.current?.src;
    engagementFields.lvMedium = user?.lvMedium ?? sbjs?.get?.current?.mdm;
    engagementFields.lvCampaign = user?.lvCampaign ?? sbjs?.get?.current?.cmp;
    engagementFields.lvContent = user?.lvContent ?? sbjs?.get?.current?.cnt;
    engagementFields.lvTerm = user?.lvTerm ?? sbjs?.get?.current?.trm;

    // engagementFields.gclid = user?.gclid ?? getUserGclid();

    engagementFields.gIp = user?.gIp ?? sbjs.get.udata.uip;
    engagementFields.gAgent = user?.gAgent ?? sbjs.get.udata.uag;

    engagementFields.gClientid = user?.gClientid ?? getClientId();
  } catch (e) {
    sbjsLogger().warning('Error getting analytics data', e.message);
  }

  return engagementFields;
};

export const sourceBuster = {
  init: initSourceBuster,
  getUserEngagementFields,
};
