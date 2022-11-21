/* eslint-disable no-param-reassign */
import { IncomingMessage, ServerResponse } from 'http';
import { i18n } from '@/controllers/i18n/i18n.client';
import { allLanguages } from '@/controllers/i18n/i18n.constants';

export default async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      await i18n.reloadResources(allLanguages);
      res.writeHead(302, {
        Location: '/',
      });
      res.end('i18n resources reloaded');
      break;
    }

    default: {
      res.statusCode = 500;
      res.end(`Method is not implemented ${req.method}`);
    }
  }
};
