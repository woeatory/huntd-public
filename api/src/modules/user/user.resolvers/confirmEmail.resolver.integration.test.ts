import { testFactory } from '@/test/testFactory';
import { UserEntity } from '@/modules/user/User.entity';
import { CONFIRM_EMAIL_INVALID_TOKEN } from '@/auth/auth.constants';
import { factory } from '@/test/factory';

describe('Test resolver: confirmEmail', testFactory(() => {
  it.todo('Check email notification');

  it('Should set confirmed to true and remove token', async () => {
    const user = await factory.user.create();

    const userEntity = new UserEntity(user);

    await userEntity.getConfirmEmailLink();

    const response = await global.client().confirmEmail({
      token: user.confirmEmailToken,
    });

    await user.reload();

    expect(user.confirmEmailToken)
      .toBeNull();
    expect(user.confirmed)
      .toBe(true);
    expect(response.errors)
      .toBeUndefined();
  });

  it('Should throw an error for wrong token', async (done) => {
    try {
      await global.client().confirmEmail({
        token: 'random',
      });

      done.fail(`Should throw ${CONFIRM_EMAIL_INVALID_TOKEN} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(CONFIRM_EMAIL_INVALID_TOKEN));

      done();
    }
  });

  it('Should throw validation error for missing token', async (done) => {
    try {
      await global.client().confirmEmail({
        token: '',
      });

      done.fail(`Should throw a validation error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));

      expect(e.message)
        .toEqual(expect.stringContaining(`"token": "REQUIRED"`));

      done();
    }
  });
}));
