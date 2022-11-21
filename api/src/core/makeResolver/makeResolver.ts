import { combineResolvers } from 'graphql-resolvers';
import {
  AuthenticationError,
  ForbiddenError,
  IFieldResolver,
  toApolloError,
  UserInputError,
} from 'apollo-server';
import { ClientError, ClientErrorTypes, idX } from '@mate-academy/core';
import { UseCaseConstructor } from '@/core/UseCase';
import { BaseCtx } from '@/core/typedefs';

export type MapOptionsFn<A, O, P = unknown> = (args: A, parent: P) => O;

export type PostProcessingFn<R, PP = R> = (
  useCaseResult: R,
  ctx: BaseCtx,
) => PP | Promise<PP>;

export interface ResolverFn<
  A, R, P = unknown, PP = R
> extends IFieldResolver<P, BaseCtx, A> {
  (parent: P, args: A, ctx: BaseCtx): Promise<PP>;
}

const handleError = (error: Error): never => {
  if (error instanceof ClientError) {
    switch (error.type) {
      case ClientErrorTypes.Unauthorized:
        throw new AuthenticationError(error.message);

      case ClientErrorTypes.Forbidden:
        throw new ForbiddenError(error.message);

      case ClientErrorTypes.NotFound:
        throw toApolloError(error, error.type);

      case ClientErrorTypes.BadRequest:
      default:
        throw new UserInputError(error.message, error.fields);
    }
  }

  throw toApolloError(error);
};

const makeSimpleResolver = <A, R, O = A, P = unknown, PP = R>(
  UseCaseClass: UseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<A, O, P> = idX,
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<A, R, P, PP> => async (
    parent: P,
    args: A,
    ctx: BaseCtx,
  ): Promise<PP> => {
    const useCase = new UseCaseClass({ ctx });

    try {
      const options = mapOptions(args, parent);
      const result = await useCase.invoke(options);
      const postProcessedResult = postProcessing(result, ctx);

      if (postProcessedResult instanceof Promise) {
        return await postProcessedResult;
      }

      return postProcessedResult;
    } catch (error) {
      return handleError(error);
    }
  };

export const makeResolver = <A, R, O = A, P = unknown, PP = R>(
  UseCaseClass: UseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<A, O, P> = idX,
  middlewares: IFieldResolver<P, BaseCtx, A>[] = [],
  postProcessing: PostProcessingFn<R, PP> = idX,
): ResolverFn<A, R, P, PP> => {
  const resolver = makeSimpleResolver<A, R, O, P, PP>(
    UseCaseClass,
    mapOptions,
    postProcessing,
  );

  if (middlewares.length) {
    return combineResolvers<P, BaseCtx, A>(
      ...middlewares as any,
      resolver,
    ) as ResolverFn<A, R, P, PP>;
  }

  return resolver;
};
