import faker from 'faker';
import { factoryLib } from '@/test/factory/factoryLib';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { makeFactory } from '@/test/factory/makeFactory';

interface Options {
  userId: number;
}

factoryLib.define(
  'usersSearchSubscription',
  UsersSearchSubscription,
  ({ userId }: Options) => ({
    userId,
    title: faker.lorem.words(2),
    searchParams: {
      technologiesIds: [
        faker.random.number({ min: 1, max: 100 }),
        faker.random.number({ min: 1, max: 100 }),
      ],
      salaryFrom: faker.random.number(1000),
      salaryTo: faker.random.number(1000),
      specializations: [
        faker.lorem.word().toUpperCase(),
        faker.lorem.word().toUpperCase(),
      ],
      cities: [faker.address.city(), faker.address.city()],
      employmentTypesIds: [faker.random.number(), faker.random.number()],
      englishLevelIds: [faker.random.number(), faker.random.number()],
      experienceIds: [faker.random.number(), faker.random.number()],
    },
  }),
);

export const usersSearchSubscription = makeFactory<UsersSearchSubscription, Options>('usersSearchSubscription');
