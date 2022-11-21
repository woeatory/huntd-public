import cookie from 'cookie';
import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { AccessToken } from '@/models/AccessToken';
import { ACCESS_TOKEN_NAME, AuthErrors } from '@/auth/auth.constants';

describe('Test resolver: logOut', testFactory(() => {
  it('Should delete token from database', async () => {
    const { user, headers, token } = await retrieveAuthUserData();

    const response = await global.client({
      headers,
    }).logOut();

    const accessToken = await AccessToken.findOne({
      where: {
        userId: user.id,
        token,
      },
    });

    expect(response.errors)
      .toBeUndefined();
    expect(accessToken)
      .toBeNull();
  });

  it('Should clear token in cookies', async () => {
    const { headers } = await retrieveAuthUserData();

    const response = await global.client({
      headers,
    }).logOut();

    const cookies = cookie.parse(response.headers.get('set-cookie') || '');

    expect(cookies[ACCESS_TOKEN_NAME])
      .toBe('');
  });

  it('Should return null for authUser query after logOut', async () => {
    const { headers } = await retrieveAuthUserData();

    await global.client({
      headers,
    }).logOut();

    const response = await global.client({
      headers,
    }).authUser();

    expect(response.data?.authUser)
      .toBeNull();
  });

  it('Should throw an error for unauthorized request', async (done) => {
    try {
      await global.client().logOut();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });
}));
