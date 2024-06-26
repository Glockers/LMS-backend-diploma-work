import { json } from 'body-parser';
import { Request } from 'express';

export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

function rawBodyMiddleware() {
  return json({
    verify: (request: RequestWithRawBody, _, buffer: Buffer) => {
      if (request.url === '/api/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    }
  });
}

export default rawBodyMiddleware;
