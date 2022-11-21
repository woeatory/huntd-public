import 'module-alias/register';
import { initServer } from '@/server/initServer';
import { rootLogger } from '@/modules/logger';

const ssl = process.env.API_SSL === 'true';
const port = process.env.API_PORT;
const path = process.env.API_PATH || '';

process.on('uncaughtException', (e) => {
  rootLogger.error(e.stack);
});
process.on('unhandledRejection', (reason) => {
  rootLogger.warning(`UNHANDLED PROMISE REJECTION: ${reason}`);
});

initServer({ path })
  .then(({ server }: {server: any}) => {
    server.listen({ port }, () => {
      rootLogger.info(
        ' 🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
        `✔️ Api server is ready at http${ssl ? 's' : ''}://localhost:${port}/${path}`,
        '🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
      );
      rootLogger.info(
        ' 🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
        `✔️ Subscriptions server is ready at ws${ssl ? 's' : ''}://localhost:${port}/${path}-ws`,
        '🚀🚀🚀 🚀🚀🚀 🚀🚀🚀',
      );
    });
  })
  .catch((error: Error) => {
    rootLogger.error('API SERVER CANNOT START', error.stack);
  });
