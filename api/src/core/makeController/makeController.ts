import { Request, Response, NextFunction } from 'express';
import { ClientError, ClientErrorTypes, idX } from '@mate-academy/core';
import { UseCaseConstructor } from '@/core/UseCase';
import { BaseCtx, RequestWithCtx } from '@/core/typedefs';

type MapOptionsFn<O> = (req: Request) => O;

type PostProcessingFn<R> = (
  useCaseResult: R,
  routerResult: {
    ctx: BaseCtx;
    req: Request;
    res: Response;
    next: NextFunction;
  }) => void;

interface ControllerFn<R> {
  (req: Request, res: Response, next: NextFunction): Promise<void | any>;
}

const handleError = (error: Error, res: Response): void => {
  if (error instanceof ClientError) {
    switch (error.type) {
      case ClientErrorTypes.Unauthorized:
        res.status(401).send(error.message);
        break;

      case ClientErrorTypes.Forbidden:
        res.status(403).send(error.message);
        break;

      case ClientErrorTypes.NotFound:
        res.status(404).send(error.message);
        break;

      case ClientErrorTypes.BadRequest:
      default:
        res.status(400).send(error.message);
    }
  } else {
    res.status(500).send(error.message);
  }
};

const makeSimpleController = <O, R>(
  UseCaseClass: UseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<O> = idX,
  postProcessing: PostProcessingFn<R> | null = null,
): ControllerFn<R> => async (req, res, next) => {
    const { ctx } = (req as RequestWithCtx);
    const useCase = new UseCaseClass({ ctx });

    try {
      const options = mapOptions(req);
      const result = await useCase.invoke(options);

      if (postProcessing) {
        return postProcessing(result, {
          req, res, next, ctx,
        });
      }

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  };

export const makeController = <O, R>(
  UseCaseClass: UseCaseConstructor<O, R>,
  mapOptions: MapOptionsFn<O> = idX,
  middlewares: ControllerFn<R>[] = [],
  postProcessing: PostProcessingFn<R> | null = null,
): ControllerFn<R>[] => {
  const controller = makeSimpleController<O, R>(
    UseCaseClass,
    mapOptions,
    postProcessing,
  );

  if (middlewares.length) {
    return [
      ...middlewares,
      controller,
    ];
  }

  return [controller];
};
