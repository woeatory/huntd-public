import faker from 'faker';
import { factoryLib } from '@/test/factory/factoryLib';
import { UserSettings } from '@/models/UserSettings';
import { makeFactory } from '@/test/factory/makeFactory';

interface Options {
  userId: number;
}

factoryLib.define('userSettings', UserSettings, (options: Options) => {
  const { userId } = options;

  return {
    userId,
    pushNotificationsPermission: faker.random.boolean(),
  };
});

export const userSettings = makeFactory<UserSettings, Options>('userSettings');
