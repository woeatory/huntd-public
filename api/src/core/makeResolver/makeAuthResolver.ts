import { IFieldResolver } from 'apollo-server';
import { idX } from '@mate-academy/core';
import {
  makeResolver,
  MapOptionsFn,
  PostProcessingFn,
  ResolverFn,
  AuthUseCaseConstructor,
} from '@/core';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { BaseCtx } from '@/core/typedefs';
import { updateLastActionTimeGuard } from '@/modules/user/user.guards/updateLastActionTime.guard';

export const makeAuthResolver = <A, R, O = A, P = unknown, PP = R>(
  UseCaseClass: AuthUseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<A, O, P> = idX,
  middlewares: IFieldResolver<P, BaseCtx, A>[] = [],
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<A, R, P, PP> => makeResolver<A, R, O, P, PP>(
  UseCaseClass,
  mapOptions,
  [isUserAuthenticatedGuard, updateLastActionTimeGuard, ...middlewares],
  postProcessing,
);
