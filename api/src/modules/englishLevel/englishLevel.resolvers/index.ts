import { englishLevelsResolver } from '@/modules/englishLevel/englishLevel.resolvers/englishLevels.resolver';

export const EnglishLevelResolvers = {
  Query: {
    englishLevels: englishLevelsResolver,
  },
};
