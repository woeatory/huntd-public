import { useMemo } from 'react';
import { EnglishLevel, useEnglishLevelsQuery } from '@/controllers/graphql/generated';

interface UseEnglishLevels {
  (): EnglishLevel[]
}

export const useEnglishLevels: UseEnglishLevels = () => {
  const englishLevelsQueryResult = useEnglishLevelsQuery();

  return useMemo(
    () => englishLevelsQueryResult.data?.englishLevels ?? [],
    [englishLevelsQueryResult],
  );
};
