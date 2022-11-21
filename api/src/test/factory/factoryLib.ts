/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { factory, SequelizeAdapter } from 'factory-girl';
import { factoryUpsert } from '@/test/factory/factory.extends/factory.upsert';

factory.setAdapter(new SequelizeAdapter());

const factoryInstance = factory;

// eslint-disable-next-line no-proto
factoryInstance.__proto__.upsert = factoryUpsert;

export {
  factoryInstance as factoryLib,
};
