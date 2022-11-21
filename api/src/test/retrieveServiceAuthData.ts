import { Sdk } from '@/graphql/generated';
import { factory } from '@/test/factory';
import { User } from '@/models/User';
import { ServiceAccessToken } from '@/models/ServiceAccessToken';
import { SERVICE_TOKEN_NAME } from '@/auth/auth.constants';

export interface ServiceAuthData {
  user: User,
  service: ServiceAccessToken;
  token: string;
  headers: {
    [SERVICE_TOKEN_NAME]: string;
  };
  client: Sdk;
}

export const retrieveServiceAuthData = async (): Promise<ServiceAuthData> => {
  const password = 'password';

  const user = await factory.adminUser.create({}, {
    password,
  });

  const serviceAccessToken = await factory.serviceAccessToken.create({}, {
    userId: user.id,
  });

  const headers = {
    [SERVICE_TOKEN_NAME]: serviceAccessToken.token,
  };

  return {
    user,
    service: serviceAccessToken,
    token: serviceAccessToken.token,
    headers,
    client: global.client({ headers }),
  };
};
