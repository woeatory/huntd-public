import { getAllTranslatesController } from '@/modules/translate/translate.controllers/getAllTranslates.controller';
import { saveMissingTranslatesController } from '@/modules/translate/translate.controllers/saveMissingTranslates.controller';

export const TranslateControllers = {
  getAllTranslates: getAllTranslatesController,
  saveMissingTranslates: saveMissingTranslatesController,
};
