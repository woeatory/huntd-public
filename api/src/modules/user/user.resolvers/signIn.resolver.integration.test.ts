import cookie from 'cookie';
import {
  ACCESS_TOKEN_NAME,
  AuthErrors,
} from '@/auth/auth.constants';
import { AccessToken } from '@/models/AccessToken';
import { User } from '@/models/User';
import { testFactory } from '@/test/testFactory';
import { factory } from '@/test/factory';

describe('Test resolver: signIn', testFactory(() => {
  let user: User;
  const password = 'test-password';

  beforeAll(async () => {
    user = await factory.user.create({}, {
      password,
    });
  });

  it('Should return user in response', async () => {
    const response = await global.client().signIn({
      email: user.email,
      password,
    });

    const { data } = response;

    expect(data)
      .not.toBe(null);

    expect(data?.signIn)
      .toMatchObject({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
  });

  it('Should save token to database', async () => {
    const response = await global.client().signIn({
      email: user.email,
      password,
    });

    const { headers } = response;

    const cookies = cookie.parse(headers.get('set-cookie') ?? '');

    const tokenCookie = cookies[ACCESS_TOKEN_NAME];

    const token = await AccessToken.findOne({
      where: {
        userId: user.id,
        token: tokenCookie,
      },
    });

    expect(token)
      .toBeTruthy();
  });

  it('Should set x-token in response cookies', async () => {
    const response = await global.client().signIn({
      email: user.email,
      password,
    });

    const { headers } = response;

    expect(headers.get('set-cookie'))
      .toEqual(expect.stringContaining(ACCESS_TOKEN_NAME));
  });

  it('Should throw authentication error for wrong credentials', async (done) => {
    try {
      await global.client().signIn({
        email: user.email,
        password: `test+${password}`,
      });

      done.fail(`Should throw ${AuthErrors.LoginInvalidCredentials} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginInvalidCredentials));
    }

    done();
  });

  it('Should throw authentication error for missing user', async (done) => {
    try {
      await global.client().signIn({
        email: `test+${user.email}`,
        password: `test+${password}`,
      });

      done.fail(`Should throw an ${AuthErrors.LoginInvalidCredentials} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.LoginInvalidCredentials));
    }

    done();
  });

  it('Should throw validation error for missing email', async (done) => {
    try {
      await global.client().signIn({
        email: '',
        password: '123',
      });

      done.fail('Should throw a validation error');
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"email": "REQUIRED"`));

      done();
    }
  });

  it('Should throw validation error for wrong email format', async (done) => {
    try {
      await global.client().signIn({
        email: 'test@email',
        password: '',
      });

      done.fail('Should throw a validation error');
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"email": "WRONG_EMAIL"`));

      done();
    }
  });

  it('Should throw validation error for missing password', async (done) => {
    try {
      await global.client().signIn({
        email: 'test@email.com',
        password: '',
      });

      done.fail('Should throw a validation error');
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"password": "REQUIRED"`));

      done();
    }
  });

  it.todo('Check signin through social media');
}));
