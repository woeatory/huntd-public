import * as userFactories from '@/test/factory/factories/user.factory';
import * as candidateProfileFactories from '@/test/factory/factories/candidateProfile.factory';
import * as recruiterProfileFactories from '@/test/factory/factories/recruiterProfile.factory';
import * as featureFactories from '@/test/factory/factories/feature.factory';
import * as serviceAccessTokenFactories from '@/test/factory/factories/serviceAccessToken.factory';
import * as usersSearchSubscriptionFactories from '@/test/factory/factories/usersSearchSubscription.factory';
import * as userSettingsFactories from '@/test/factory/factories/userSettings.factory';

export const factory = {
  ...userFactories,
  ...candidateProfileFactories,
  ...recruiterProfileFactories,
  ...featureFactories,
  ...serviceAccessTokenFactories,
  ...usersSearchSubscriptionFactories,
  ...userSettingsFactories,
};

export type HuntdFactories = typeof factory;
