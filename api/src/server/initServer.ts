import http from 'http';
import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { initDb } from '@/models';
import { initRestApi } from '@/rest';
import { origins } from '@/server/server.constants';
import { PubSubConstructor } from '@/modules/pubSub';
import initServices from './initServices';
import { initApollo } from './initApollo';

interface Server {
  server: http.Server,
  db: Sequelize,
}

export const initServer = async (config: { path: string }): Promise<Server> => {
  const db = await initDb();

  const pubSub = new PubSubConstructor();

  const apollo = await initApollo({
    db,
    pubSub,
  });

  const app = express();

  await initRestApi({
    db,
    app,
    pubSub,
  });

  await initServices();

  const server = await http.createServer(app);

  apollo.applyMiddleware({
    app,
    path: `/${config.path}`,
    cors: {
      origin: origins[process.env.APP_ENV],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['POST'],
    },
  });

  // Add subscription support
  await apollo.installSubscriptionHandlers(server);

  app.get('/healthz', (req, res) => res.sendStatus(200));

  return {
    server, db,
  };
};
