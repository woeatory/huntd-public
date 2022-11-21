import { ApolloServer } from 'apollo-server-express';
import { Sequelize } from 'sequelize-typescript';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { NotificationsGatewayMock } from '@mate-academy/notifications-gateway';
import { NodeEnvironments } from '@mate-academy/core';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { resolvers } from '@/modules/resolvers';
import { schemas } from '@/modules/schemas';
import { models } from '@/models';
import { getAuthUser } from '@/auth/getAuthUser';
import { makeApiLogger } from '@/modules/logger';
import { BaseCtx, ConnectionCtx } from '@/core/typedefs';
import { initLoaders } from '@/modules/dataLoaders';
import { SQSQueue } from '@/sqsMessages/SQSQueue';
import { getServiceUser } from '@/auth/getServiceUser';
import { User } from '@/models/User';
import { getAuthUserWs } from '@/auth/getAuthUserWs';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { AnalyticsClient } from '@/core/gateways/Analytics';
import { initFeatures, FeaturesTool } from '@/modules/feature/initFeatures';

const allowPlayground = process.env.NODE_ENV === NodeEnvironments.Development;

interface ContextArgs {
  req: Request;
  res: Response;
  connection: ExecutionParams<ConnectionCtx>;
}

interface InitApollo {
  (options: {
    db: Sequelize,
    pubSub: PubSub
  }): ApolloServer,
}

const cp = cookieParser();
const addCookies = (req: Request, res: Response) => new Promise(
  (resolve) => {
    cp(req, res, resolve);
  },
);

export const initApollo: InitApollo = ({
  db,
  pubSub,
}) => new ApolloServer({
  typeDefs: schemas,
  resolvers,
  playground: allowPlayground && {
    settings: {
      'request.credentials': 'include',
    },
  },
  subscriptions: {
    path: `/${process.env.API_PATH}-ws`,
    async onConnect(connectionParams, ws, ctx) {
      const authUser = await getAuthUserWs(ctx.request, connectionParams);

      return ({ authUser });
    },
  },
  context: async ({ req, res, connection }: ContextArgs): Promise<BaseCtx> => {
    let authUser: UserWithToken | null = null;
    let adminUser: UserWithToken | null = null;
    let serviceUser: User | null = null;
    let features: FeaturesTool | null = null;

    if (req && res) {
      await addCookies(req, res);

      ([
        authUser,
        adminUser,
        serviceUser,
        features,
      ] = await Promise.all([
        getAuthUser(req, res),
        getAuthUser(req, res, true),
        getServiceUser(req),
        initFeatures(),
      ]));
    }

    const logger = makeApiLogger({
      name: 'Apollo', userId: authUser?.id || null,
    });

    const notifications = new NotificationsGatewayMock();
    const analytics = new AnalyticsClient();
    const queue = new SQSQueue(logger);

    return {
      db,
      models,
      authUser: authUser || connection?.context.authUser,
      adminUser,
      serviceUser,
      features: features as FeaturesTool,
      logger,
      req,
      res,
      pubSub,
      gateways: {
        notifications,
        analytics,
        queue,
      },
      dataLoaders: initLoaders(models),
    };
  },
});
