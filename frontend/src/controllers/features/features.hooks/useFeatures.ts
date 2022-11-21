import {
  Feature,
  useFeaturesQuery,
} from '@/controllers/graphql/generated';

interface useFeatures {
  (): Array<Feature>
}

export const useFeatures:useFeatures = () => {
  const queryResult = useFeaturesQuery();

  return queryResult.data?.features ?? [];
};
