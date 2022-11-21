import cookie from 'cookie';
import omit from 'lodash/omit';
import { PrimaryProfile, SignUpMutation } from '@/graphql/generated';
import { prepareSignUpData } from '@/test/prepareSignupData';
import {
  ACCESS_TOKEN_NAME,
  AuthErrors,
} from '@/auth/auth.constants';
import { AccessToken } from '@/models/AccessToken';
import { User } from '@/models/User';
import { UserEntity } from '@/modules/user/User.entity';
import { testFactory } from '@/test/testFactory';

describe('Test resolver: signUp', testFactory(() => {
  it('Should execute signUp mutation without errors', async () => {
    const variables = prepareSignUpData();
    const response = await global.client().signUp(variables);

    expect(response.data?.signUp)
      .toBeTruthy();

    expect(response.errors)
      .toBeUndefined();
  });

  it('Should return user in response', async () => {
    const variables = prepareSignUpData();

    const expectedResponse: SignUpMutation['signUp'] = {
      id: expect.any(Number),
      firstName: variables.firstName,
      lastName: variables.lastName,
      email: UserEntity.formatEmail(variables.email),
      phone: UserEntity.formatPhone(variables.phone),
      username: null, // TODO: generate username
      confirmed: false,
      inactive: false,
      primaryProfile: PrimaryProfile.NotDefined,
    };

    const response = await global.client().signUp(variables);

    const user = response.data?.signUp;

    expect(user)
      .toMatchObject(expectedResponse);
  });

  it('Should save user in database', async () => {
    const variables = prepareSignUpData();

    const expectedResponse = omit(
      {
        ...variables,
        email: UserEntity.formatEmail(variables.email),
        phone: UserEntity.formatPhone(variables.phone),
      },
      'password', 'repeatPassword',
    );

    const response = await global.client().signUp(variables);

    const user = await User.findByPk(response.data?.signUp.id);

    expect(user?.get({ plain: true }))
      .toMatchObject(expectedResponse);
    expect(user?.password)
      .toBeTruthy();
    expect(user?.password)
      .not.toBe(variables.password);
  });

  it('Should signIn to recently created user', async () => {
    const variables = prepareSignUpData();

    await global.client().signUp(variables);

    const response = await global.client().signIn({
      email: variables.email,
      password: variables.password,
    });

    const expectedResponse = {
      email: UserEntity.formatEmail(variables.email),
      firstName: variables.firstName,
      lastName: variables.lastName,
    };

    const user = response.data?.signIn;

    expect(user)
      .toMatchObject(expectedResponse);

    expect(response.errors)
      .toBeUndefined();
  });

  it('Should set x-token in response cookies', async () => {
    const variables = prepareSignUpData();

    const response = await global.client().signUp(variables);

    const { headers } = response;

    expect(headers.get('set-cookie'))
      .toEqual(expect.stringContaining(ACCESS_TOKEN_NAME));
  });

  it('Should save token to database', async (done) => {
    const variables = prepareSignUpData();

    const response = await global.client().signUp(variables);

    const { headers } = response;

    const cookies = cookie.parse(headers.get('set-cookie') ?? '');

    const tokenCookie = cookies[ACCESS_TOKEN_NAME];

    if (!response.data?.signUp) {
      return done.fail('Should signUp without errors');
    }

    const token = await AccessToken.findOne({
      where: {
        userId: response.data?.signUp.id,
        token: tokenCookie,
      },
    });

    expect(token)
      .toBeTruthy();

    return done();
  });

  it('Should throw validation error for missing email', async (done) => {
    try {
      await global.client().signUp({
        email: '',
        password: '123',
        repeatPassword: '123',
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
      await global.client().signUp({
        email: 'test@email',
        password: '123',
        repeatPassword: '123',
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

  it('Should throw validation error for missing password fields', async (done) => {
    try {
      await global.client().signUp({
        email: 'test@email.com',
        password: '',
        repeatPassword: '',
      });

      done.fail('Should throw a validation error');
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

  it('Should throw validation error for different password fields', async (done) => {
    try {
      await global.client().signUp({
        email: 'test@email.com',
        password: '123',
        repeatPassword: '321',
      });

      done.fail('Should throw a validation error');
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining('validation'));
      expect(e.message)
        .toEqual(expect.stringContaining(`"repeatPassword": "FIELDS_NOT_EQUAL"`));

      done();
    }
  });

  it('Should throw an error for existing email', async (done) => {
    const variables = prepareSignUpData();

    await global.client().signUp(variables);

    try {
      await global.client().signUp(variables);

      done.fail(`Should throw ${AuthErrors.RegisterEmailAlreadyTaken} error`);
    } catch (e) {
      expect(e.message)
        .toEqual(expect.stringContaining(AuthErrors.RegisterEmailAlreadyTaken));
    }

    done();
  });

  it.todo('Check email notification');
  it.todo('Check signup through social media');
}));
