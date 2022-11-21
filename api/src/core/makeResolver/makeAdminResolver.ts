import { IFieldResolver } from 'apollo-server';
import { idX } from '@mate-academy/core';
import {
  AdminUseCaseConstructor,
  makeResolver,
  MapOptionsFn,
  PostProcessingFn,
  ResolverFn,
} from '@/core';
import { BaseCtx } from '@/core/typedefs';
import { isAdminAuthenticatedGuard } from '@/modules/user/user.guards/isAdminAuthenticated.guard';

export const makeAdminResolver = <A, R, O = A, P = unknown, PP = R>(
  UseCaseClass: AdminUseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<A, O, P> = idX,
  middlewares: IFieldResolver<P, BaseCtx, A>[] = [],
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<A, R, P, PP> => makeResolver<A, R, O, P, PP>(
  UseCaseClass,
  mapOptions,
  [isAdminAuthenticatedGuard, ...middlewares],
  postProcessing,
);
