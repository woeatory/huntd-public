import { GetTranslatesUseCase, GetTranslatesUseCaseOptions, GetTranslatesUseCaseResult } from '@/modules/translate/translate.useCases/GetTranslates.useCase';
import { makeController } from '@/core';

export const getAllTranslatesController = makeController<
  GetTranslatesUseCaseOptions, GetTranslatesUseCaseResult
>(
  GetTranslatesUseCase,
  (req) => ({
    lang: req.query.lang as string,
    namespace: req.query.namespace as string,
  }),
);
