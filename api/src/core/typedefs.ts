import { Request, Response } from 'express';
import { UseCaseCtx } from '@/core/UseCase';
import { UserWithToken } from '@/modules/user/user.typedefs';

export interface BaseCtx extends UseCaseCtx {
  req: Request;
  res: Response;
}

export interface RequestWithCtx extends Request {
  ctx: BaseCtx;
}

export interface ConnectionCtx {
  authUser: UserWithToken | null
}

export interface AnyObject {
  [key: string]: any;
}
