import { testFactory } from '@/test/testFactory';
import { factory } from '@/test/factory/';
import { FeatureStatusEnum } from '@/modules/feature/feature.typedefs';

describe('Test resolver: features', testFactory(() => {
  it('Should return an array of features in response', async () => {
    await factory.enabledFeature.createMany(2);

    const { data } = await global.client().features();

    expect(data)
      .not.toBeNull();
    expect(data?.features?.length)
      .not.toBe(0);
    expect(data?.features)
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            status: expect.stringContaining(FeatureStatusEnum.Enabled),
          }),
        ]),
      );
  });
}));
