import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AccessToken } from '@/models/AccessToken';
import { User } from '@/models/User';
import { setAdminHeaders, setAuthHeaders } from '@/auth/setAuthHeaders';
import { ACCESS_TOKEN_NAME, ADMIN_TOKEN_NAME } from '@/auth/auth.constants';
import { MINUTE } from '@/constants/time';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { UserEntity } from '@/modules/user/User.entity';
import { JWTAuthUser } from '@/auth/auth.typedefs';

export const getAuthUser = async (
  req: Request,
  res: Response,
  isAdmin = false,
): Promise<UserWithToken | null> => {
  const accessToken = isAdmin
    ? req.cookies[ADMIN_TOKEN_NAME]
    : req.cookies[ACCESS_TOKEN_NAME] || req.headers[ACCESS_TOKEN_NAME];

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

  Object.assign(user, { accessToken });

  const userEntity = new UserEntity(user);

  // refresh only if token is almost expired (<15m)
  const currentTime = Date.now() / 1000;

  if ((data.exp - currentTime) < (15 * (MINUTE / 1000))) {
    const newToken = userEntity.generateAccessToken();

    await savedToken.update({
      token: newToken,
    });

    Object.assign(user, { accessToken: newToken });

    const setHeaders = isAdmin ? setAdminHeaders : setAuthHeaders;

    setHeaders(res, newToken);
  }

  return user as UserWithToken;
};
