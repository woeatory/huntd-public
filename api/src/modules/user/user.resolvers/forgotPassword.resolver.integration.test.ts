import { testFactory } from '@/test/testFactory';
import { FORGOT_PASSWORD_INVALID_EMAIL } from '@/auth/auth.constants';
import { User } from '@/models/User';
import { factory } from '@/test/factory';

describe('Test resolver: forgotPassword', testFactory(() => {
  let user: User;

  beforeEach(async () => {
    user = await factory.user.create();
  });

  it.todo('Check sending email');

  it('Should create resetPasswordToken', async () => {
    await global.client().forgotPassword({
      email: user.email,
    });

    await user.reload();

    expect(user.resetPasswordToken)
      .not.toBeNull();
  });

  it('Should be possible to reset password with generated token', async () => {
    await global.client().forgotPassword({
      email: user.email,
    });

    await user.reload();

    const response = await global.client().resetPassword({
      token: user.resetPasswordToken,
      password: 'random',
      repeatPassword: 'random',
    });

    expect(response.errors)
      .toBeUndefined();
  });

  it('Should throw an error for missing user', async (done) => {
    try {
      await global.client().forgotPassword({
        email: 'random@email.com',
      });

      done.fail(`Should throw ${FORGOT_PASSWORD_INVALID_EMAIL} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(FORGOT_PASSWORD_INVALID_EMAIL));

      done();
    }
  });

  it('Should throw validation error for missing email', async (done) => {
    try {
      await global.client().forgotPassword({
        email: '',
      });

      done.fail(`Should throw a validation error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"email": "REQUIRED"`));

      done();
    }
  });

  it('Should throw validation error for wrong email', async (done) => {
    try {
      await global.client().forgotPassword({
        email: 'email',
      });

      done.fail(`Should throw a validation error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"email": "WRONG_EMAIL"`));

      done();
    }
  });
}));
