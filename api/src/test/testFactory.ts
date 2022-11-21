import { setup, tearDown } from '@/test/test.server';
import EmptyFunction = jest.EmptyFunction;

interface TestFactory{
  (callback: EmptyFunction): EmptyFunction
}

export const testFactory: TestFactory = (callback) => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await tearDown();
  });

  return callback;
};
