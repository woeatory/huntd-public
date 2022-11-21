import cookie from 'cookie';
import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { ACCESS_TOKEN_NAME } from '@/auth/auth.constants';

describe('Test resolver: authUser', testFactory(() => {
  it('Should return null for anonymous request', async () => {
    const response = await global.client().authUser();

    expect(response.data?.authUser)
      .toBeNull();
  });

  it('Should return current user for authorized request', async () => {
    const { user, headers } = await retrieveAuthUserData();

    const response = await global.client({
      headers,
    }).authUser();

    expect(response.data?.authUser?.email)
      .toBe(user.email);
  });

  it('Should return null for wrong token', async () => {
    const response = await global.client({
      headers: {
        cookie: cookie.serialize(ACCESS_TOKEN_NAME, 'random cookie string'),
      },
    }).authUser();

    expect(response.data?.authUser)
      .toBeNull();
  });
}));
