import cookie from 'cookie';
import { User } from '@/models/User';
import { ACCESS_TOKEN_NAME } from '@/auth/auth.constants';
import { factory } from '@/test/factory';

export const retrieveAuthToken = async (user: User, password: string) => {
  const { headers } = await global.client().signIn({
    email: user.email,
    password,
  });

  const cookies = cookie.parse(headers.get('set-cookie') || '');

  return cookies[ACCESS_TOKEN_NAME];
};

export const retrieveAuthUserData = async () => {
  const password = 'password';

  const user = await factory.user.create({}, {
    password,
  });

  const token = await retrieveAuthToken(user, password);

  const headers = {
    cookie: cookie.serialize(ACCESS_TOKEN_NAME, token),
  };

  const client = global.client({ headers });

  return {
    user,
    password,
    token,
    headers,
    client,
  };
};
