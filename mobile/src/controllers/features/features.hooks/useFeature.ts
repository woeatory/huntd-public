import { FeatureStatus, useFeatureQuery } from '@/controllers/graphql/generated';
import { Features } from '@/controllers/features/features.constants';

interface UseFeatureHook {
  (feature: Features): {
    feature: string;
    isEnabled: () => boolean;
  }
}

export const useFeature: UseFeatureHook = (feature: string) => {
  const queryResult = useFeatureQuery({
    variables: {
      name: feature,
    },
  });

  return {
    feature,
    isEnabled: () => (
      queryResult.data?.feature?.status === FeatureStatus.Enabled
    ),
  };
};
