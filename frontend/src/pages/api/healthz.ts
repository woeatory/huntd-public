/* eslint-disable no-param-reassign */
import { IncomingMessage, ServerResponse } from 'http';

export default async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      res.statusCode = 200;
      res.end('OK');
      break;
    }

    default: {
      res.statusCode = 500;
      res.end(`Method is not implemented ${req.method}`);
    }
  }
};
