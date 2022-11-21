import { IFieldResolver } from 'apollo-server';
import { idX } from '@mate-academy/core';
import {
  makeResolver,
  PostProcessingFn,
  ResolverFn,
  UseCaseConstructor,
} from '@/core';
import { BaseCtx } from '@/core/typedefs';

export const makeChildResolver = <P, R, PP = R>(
  UseCaseClass: UseCaseConstructor<P, R>,
  middlewares: IFieldResolver<P, BaseCtx, unknown>[] = [],
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<unknown, R, P, PP> => makeResolver<unknown, R, P, P, PP>(
  UseCaseClass,
  (_, parent) => parent,
  middlewares,
  postProcessing,
);
