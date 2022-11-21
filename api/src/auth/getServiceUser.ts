import { Request } from 'express';
import { User } from '@/models/User';
import { SERVICE_TOKEN_NAME } from '@/auth/auth.constants';
import { ServiceAccessToken } from '@/models/ServiceAccessToken';

export const getServiceUser = async (
  req: Request,
): Promise<User | null> => {
  const token = req.headers[SERVICE_TOKEN_NAME];

  if (!token) {
    return null;
  }

  const serviceAccessToken = await ServiceAccessToken.findOne({
    where: {
      token,
    },
    include: [
      {
        model: User,
      }],
  });

  if (!serviceAccessToken?.user) {
    return null;
  }

  return serviceAccessToken.user;
};
