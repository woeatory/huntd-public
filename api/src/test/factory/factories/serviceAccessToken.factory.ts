import { factoryLib } from '@/test/factory/factoryLib';
import { faker } from '@/test/faker';
import { makeFactory } from '@/test/factory/makeFactory';
import { ServiceAccessToken } from '@/models/ServiceAccessToken';

interface Options {
  userId: number,
}

factoryLib.define(
  'serviceAccessToken',
  ServiceAccessToken,
  (options: Options) => {
    const {
      userId,
    } = options;

    return ({
      token: faker.random.uuid(),
      userId,
    });
  },
);

export const serviceAccessToken = makeFactory<ServiceAccessToken, Options>('serviceAccessToken');
