import { testFactory } from '@/test/testFactory';
import { factory } from '@/test/factory/';

describe('Test resolver: feature', testFactory(() => {
  it('Should return a proper feature fields in response', async () => {
    const feature = await factory.feature.create();
    const { data } = await global.client().feature({
      name: feature.name,
    });

    expect(data)
      .not.toBeNull();
    expect(data?.feature?.id)
      .toBe(feature.id);
    expect(data?.feature?.name)
      .toEqual(feature.name);
    expect(data?.feature?.status)
      .toBe(feature.status);
  });
  it('Should return \'null\' if there is unknown feature name', async () => {
    const { data } = await global.client().feature({
      name: 'unknown_feature_name',
    });

    expect(data?.feature)
      .toBeNull();
  });
}));
