import { testFactory } from '@/test/testFactory';
import { AuthErrors } from '@/auth/auth.constants';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { factory } from '@/test/factory';

describe(`Test resolver: updateUserSettings`, testFactory(() => {
  it(`should throw an error for unauthorized request`, async (done) => {
    try {
      await global.client().updateUserSettings();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });

  it(`should update user settings`, async () => {
    const { user, client } = await retrieveAuthUserData();

    const userSettings = await factory.userSettings.create({
      userId: user.id,
      pushNotificationsPermission: true,
    });

    await client.updateUserSettings({
      pushNotificationsPermission: false,
    });

    await userSettings.reload();

    expect(userSettings.pushNotificationsPermission)
      .toBe(false);
  });
}));
