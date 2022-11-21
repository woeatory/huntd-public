import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { factory } from '@/test/factory';

describe(`Test resolver: userSettings`, testFactory(() => {
  it('Should return null for anonymous request', async () => {
    const response = await global.client().userSettings();

    expect(response.data?.authUser)
      .toBeNull();
  });

  it(`should receive user settings`, async () => {
    const { user, client } = await retrieveAuthUserData();

    const createdSettings = await factory.userSettings.create({
      userId: user.id,
    });

    const { data } = await client.userSettings();

    expect(createdSettings)
      .toMatchObject({
        ...(data ? data.authUser?.settings : {}),
      });
  });

  it(`should create user settings if it doesn't exist`, async () => {
    const { user, client } = await retrieveAuthUserData();

    const { data } = await client.userSettings();

    expect(data?.authUser?.settings)
      .not.toBeNull();

    expect(data?.authUser?.settings?.userId)
      .toBe(user.id);
  });
}));
