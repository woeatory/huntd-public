import { useRouter } from 'next/router';
import { FeatureStatus, useFeatureQuery } from '@/controllers/graphql/generated';

interface useFeature {
  (name: string): { isEnabled: () => boolean; name: string }
}

export const useFeature:useFeature = (name: string) => {
  const { query } = useRouter();
  const queryResult = useFeatureQuery({
    variables: {
      name,
    },
  });

  return {
    name,
    isEnabled: () => query[name] === FeatureStatus.Enabled
      || queryResult.data?.feature?.status === FeatureStatus.Enabled,
  };
};
