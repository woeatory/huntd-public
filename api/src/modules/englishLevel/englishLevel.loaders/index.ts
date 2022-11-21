import { Models } from '@/models';
import { EnglishLevelByIdLoader } from '@/modules/englishLevel/englishLevel.loaders/EnglishLevelById.loader';

export const initEnglishLevelLoaders = (models: Models) => ({
  englishLevelById: new EnglishLevelByIdLoader(models),
});
