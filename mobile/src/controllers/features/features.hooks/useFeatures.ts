import { Feature, useFeaturesQuery } from '@/controllers/graphql/generated';

interface UseFeaturesHook {
  (): Array<Feature>
}

export const useFeatures: UseFeaturesHook = () => {
  const queryResult = useFeaturesQuery();

  return queryResult.data?.features ?? [];
};
