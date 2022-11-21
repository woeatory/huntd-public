import { testFactory } from '@/test/testFactory';
import { User } from '@/models/User';
import { UserEntity } from '@/modules/user/User.entity';
import {
  RESET_PASSWORD_INVALID_TOKEN,
  AuthErrors,
} from '@/auth/auth.constants';
import { AccessToken } from '@/models/AccessToken';
import { factory } from '@/test/factory';

describe('Test resolver: resetPassword', testFactory(() => {
  let user: User;
  const defaultPassword = 'defaultPassword';

  beforeEach(async () => {
    user = await factory.user.create({}, {
      password: defaultPassword,
    });
  });

  it.todo('Check sending email notification');

  it('Should reset password while calling mutation', async () => {
    const userEntity = new UserEntity(user);

    const password = 'new-password';

    await userEntity.getResetPasswordLink();

    const response = await global.client().resetPassword({
      token: user.resetPasswordToken,
      password,
      repeatPassword: password,
    });

    await user.reload();

    expect(await userEntity.validatePassword(password))
      .toBe(true);
    expect(response.errors)
      .toBeUndefined();
  });

  it('Should throw an error for authentication with old password', async (done) => {
    const userEntity = new UserEntity(user);

    const password = 'new-password';

    await userEntity.getResetPasswordLink();

    await global.client().resetPassword({
      token: user.resetPasswordToken,
      password,
      repeatPassword: password,
    });

    try {
      await global.client().signIn({
        email: user.email,
        password: defaultPassword,
      });

      done.fail(`Should throw ${AuthErrors.LoginInvalidCredentials} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginInvalidCredentials));

      done();
    }
  });

  it('Should login with new password', async () => {
    const userEntity = new UserEntity(user);

    const password = 'new-password';

    await userEntity.getResetPasswordLink();

    await global.client().resetPassword({
      token: user.resetPasswordToken,
      password,
      repeatPassword: password,
    });

    const response = await global.client().signIn({
      email: user.email,
      password,
    });

    expect(response.data?.signIn.email)
      .toBe(user.email);
    expect(response.errors)
      .toBeUndefined();
  });

  it('Should throw an error for wrong token', async (done) => {
    try {
      await global.client().resetPassword({
        token: 'random',
        password: 'random',
        repeatPassword: 'random',
      });
      done.fail(`Should throw ${RESET_PASSWORD_INVALID_TOKEN} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(RESET_PASSWORD_INVALID_TOKEN));

      done();
    }
  });

  it('Should throw the validation error for missing password fields', async (done) => {
    try {
      await global.client().resetPassword({
        token: 'random',
        password: '',
        repeatPassword: '',
      });
      done.fail(`Should throw the validation error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"password": "REQUIRED"`));
      expect(e.message)
        .toEqual(expect.stringContaining(`"repeatPassword": "REQUIRED"`));

      done();
    }
  });

  it('Should throw the validation error if password fields are not equal', async (done) => {
    try {
      await global.client().resetPassword({
        token: 'random',
        password: 'random',
        repeatPassword: 'random-random',
      });
      done.fail(`Should throw the validation error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"repeatPassword": "FIELDS_NOT_EQUAL"`));

      done();
    }
  });

  it('Should remove all access tokens after resetting password', async () => {
    const userEntity = new UserEntity(user);

    await global.client().signIn({
      email: user.email,
      password: defaultPassword,
    });

    await userEntity.getResetPasswordLink();

    await global.client().resetPassword({
      token: user.resetPasswordToken,
      password: '123',
      repeatPassword: '123',
    });

    const accessTokens = await AccessToken.findAll({
      where: {
        userId: user.id,
      },
    });

    expect(accessTokens)
      .toEqual([]);
  });
}));
