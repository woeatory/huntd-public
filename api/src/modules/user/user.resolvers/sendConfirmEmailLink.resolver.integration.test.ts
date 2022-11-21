import { testFactory } from '@/test/testFactory';
import { retrieveAuthUserData } from '@/test/retrieveAuthUser';
import { AuthErrors } from '@/auth/auth.constants';

describe('Test resolver: sendConfirmEmailLink', testFactory(() => {
  it.todo('Check email notification sending');

  it('Should generate confirmEmailToken for current user', async () => {
    const { user, headers } = await retrieveAuthUserData();

    const response = await global.client({
      headers,
    }).sendConfirmEmailLink();

    await user.reload();

    expect(user.confirmEmailToken)
      .not.toBeNull();
    expect(response.errors)
      .toBeUndefined();
  });

  it('Should throw unauthorized error for anonymous request', async (done) => {
    try {
      await global.client().sendConfirmEmailLink();

      done.fail(`Should throw ${AuthErrors.LoginNotAuthorized} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginNotAuthorized));

      done();
    }
  });
}));
