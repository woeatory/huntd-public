import portfinder from 'portfinder';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { initServer } from '@/server/initServer';
import { getSdk } from '@/graphql/generated';
import { createGraphQLClient } from '@/test/test.helpers';

export const setup = async (): Promise<void> => {
  const port = await portfinder.getPortPromise();
  const {
    server, db,
  } = await initServer({ path: process.env.API_PATH });

  global.apiServer = server;
  global.db = db;
  global.port = port;

  global.client = (options?: RequestInit) => (
    getSdk(createGraphQLClient(options))
  );

  return new Promise((resolve) => {
    server.listen({ port }, resolve);
  });
};

export const tearDown = async (): Promise<void> => {
  const { db, apiServer } = global;

  await db.close();
  apiServer.close();
};
