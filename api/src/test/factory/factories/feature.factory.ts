import { factoryLib } from '@/test/factory/factoryLib';
import { faker } from '@/test/faker';
import { Feature } from '@/models/Feature';
import { FeatureStatusEnum } from '@/modules/feature/feature.typedefs';
import { makeFactory } from '@/test/factory/makeFactory';

factoryLib.define(
  'feature',
  Feature,
  () => ({
    name: faker.name.title(),
    status: faker.random.objectElement(FeatureStatusEnum),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }),
);

factoryLib.extend('feature', 'enabledFeature', {
  status: FeatureStatusEnum.Enabled,
});

factoryLib.extend('feature', 'disabledFeature', {
  status: FeatureStatusEnum.Disabled,
});

export const feature = makeFactory<Feature>('feature');
export const enabledFeature = makeFactory<Feature>('enabledFeature');
export const disabledFeature = makeFactory<Feature>('disabledFeature');
