import { IFieldResolver } from 'apollo-server';
import { idX } from '@mate-academy/core';
import {
  makeResolver,
  MapOptionsFn,
  PostProcessingFn,
  ResolverFn,
  ServiceUseCaseConstructor,
} from '@/core';
import { BaseCtx } from '@/core/typedefs';
import { isServiceUserAuthenticatedGuard } from '@/modules/user/user.guards/isServiceUserAuthenticated.guard';

export const makeServiceResolver = <A, R, O = A, P = unknown, PP = R>(
  UseCaseClass: ServiceUseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<A, O, P> = idX,
  middlewares: IFieldResolver<P, BaseCtx, A>[] = [],
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<A, R, P, PP> => makeResolver<A, R, O, P, PP>(
  UseCaseClass,
  mapOptions,
  [isServiceUserAuthenticatedGuard, ...middlewares],
  postProcessing,
);
