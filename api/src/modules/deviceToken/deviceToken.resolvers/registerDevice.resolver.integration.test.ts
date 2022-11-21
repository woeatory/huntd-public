import * as faker from 'faker';
import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { DevicePlatform } from '@/graphql/generated';
import { AuthErrors } from '@/auth/auth.constants';

describe('registerDevice resolver', testFactory(() => {
  it('should throw login_not_authorized error when called anonymously', async () => {
    const testDeviceToken = {
      token: faker.random.words(),
      devicePlatform: DevicePlatform.Ios,
    };

    await expect(
      global.client().registerDevice(testDeviceToken),
    )
      .rejects.toEqual(
        expect.objectContaining({
          message: expect.stringContaining(AuthErrors.LoginNotAuthorized),
        }),
      );
  });

  it('should create device token', async () => {
    const { headers, user } = await retrieveAuthUserData();

    const testDeviceToken = {
      token: faker.random.words(),
      devicePlatform: DevicePlatform.Ios,
    };

    const { data } = await global.client({ headers })
      .registerDevice(testDeviceToken);

    expect(data?.registerDevice?.token)
      .toBe(testDeviceToken.token);

    expect(data?.registerDevice?.userId)
      .toBe(user.id);

    expect(data?.registerDevice?.devicePlatform)
      .toBe(testDeviceToken.devicePlatform);
  });
}));
