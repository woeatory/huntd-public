import { makeController } from '@/core';
import {
  SaveTranslatesUseCase,
  SaveTranslatesUseCaseOptions,
  SaveTranslatesUseCaseResult,
} from '@/modules/translate/translate.useCases/SaveTranslates.useCase';

export const saveMissingTranslatesController = makeController<
  SaveTranslatesUseCaseOptions, SaveTranslatesUseCaseResult
>(
  SaveTranslatesUseCase,
  (req) => ({
    lang: req.query.lang as string,
    namespace: req.query.namespace as string,
    body: req.body,
  }),
);
