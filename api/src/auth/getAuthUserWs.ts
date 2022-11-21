import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { AccessToken } from '@/models/AccessToken';
import { User } from '@/models/User';
import { ACCESS_TOKEN_NAME } from '@/auth/auth.constants';
import { JWTAuthUser } from '@/auth/auth.typedefs';
import { UserWithToken } from '@/modules/user/user.typedefs';

export const getAuthUserWs = async (
  req: IncomingMessage,
  connectionParams: ConnectionParams,
): Promise<UserWithToken | null> => {
  const cookies = cookie.parse(req.headers.cookie || '');

  const accessToken = (
    cookies[ACCESS_TOKEN_NAME] || connectionParams[ACCESS_TOKEN_NAME]
  );

  if (!accessToken) {
    return null;
  }

  let data: JWTAuthUser;

  try {
    data = jwt.verify(
      accessToken, process.env.AUTH_SECRET,
    ) as JWTAuthUser;
  } catch (e) {
    // TODO: log expired_session somehow to the user
    // TODO: delete expired tokens from database
    // throw new AuthenticationError('login_session_expired');
    return null;
  }

  const user = await User.findByPk(data.id, {
    include: [
      {
        model: AccessToken,
      },
    ],
  });

  const savedToken = user?.accessTokens.find(
    (userToken) => userToken.token === accessToken,
  );

  if (!user || !savedToken) {
    return null;
  }

  Object.assign(user, { accessToken: savedToken });

  return user as UserWithToken;
};
