import bodyParser from 'body-parser';
import {
  Application, NextFunction, Request, Response,
} from 'express';
import passport from 'passport';
import { Sequelize } from 'sequelize-typescript';
import { makeApiLogger, rootLogger } from '@/modules/logger';
import { models } from '@/models';
import { initTranslateRouter } from '@/rest/translate/translate.routes';
import { initOAuthRouter } from '@/rest/oauth/oauth.routes';
import { BaseCtx } from '@/core/typedefs';
import { SQSQueue } from '@/sqsMessages/SQSQueue';
import { initLoggerRouter } from '@/rest/logger/logger.routes';
import { initLoaders } from '@/modules/dataLoaders';
import { getServiceUser } from '@/auth/getServiceUser';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';
import { AnalyticsClient } from '@/core/gateways/Analytics';
import { initFeatures } from '@/modules/feature/initFeatures';
import { initAmplitudeRouter } from '@/rest/amplitude/amplitude.routes';

const routes = [
  initTranslateRouter,
  initOAuthRouter,
  initLoggerRouter,
  initAmplitudeRouter,
];

interface InitRestApi {
  (options: {
    db: Sequelize;
    app: Application;
    pubSub: PubSub;
  }): void;
}
export const initRestApi: InitRestApi = ({
  db,
  app,
  pubSub,
}): void => {
  app.use(passport.initialize());
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '5mb',
    }),
  );
  app.use(
    bodyParser.json({
      type: 'application/json',
      limit: '5mb',
    }),
  );

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const logger = makeApiLogger({
      name: 'REST',
    });
    const analytics = new AnalyticsClient();
    const queue = new SQSQueue(logger);
    const features = await initFeatures();

    const serviceUser = await getServiceUser(req);

    const ctx: BaseCtx = {
      db,
      authUser: null, // not used in REST. Add if needed
      adminUser: null, // not used in REST. Add if needed
      serviceUser,
      logger,
      req,
      res,
      features,
      pubSub,
      gateways: {
        analytics,
        queue,
      },
      models,
      dataLoaders: initLoaders(models),
    };

    Object.assign(req, { ctx });
    next();
  });

  routes.forEach((initRoute) => {
    try {
      initRoute(app);
      rootLogger.info(
        `REST endpoint initialized for "${initRoute.exportsName}"`,
      );
    } catch (error) {
      rootLogger.error(
        `Error while REST endpoint initialization for "${initRoute.exportsName}":`,
        error.message,
        error.stack,
      );
    }
  });
};
