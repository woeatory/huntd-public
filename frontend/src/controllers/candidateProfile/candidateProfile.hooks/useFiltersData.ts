import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { TechnologyBaseFragment, useTechnologiesQuery } from '@/controllers/graphql/generated';

interface FiltersData {
  technologiesData: TechnologyBaseFragment[]
  loading: boolean,
}

export const useFiltersData = (): FiltersData => {
  const router = useRouter();
  const { whereClause: queryValues } = useQueryBuilder(router.query);
  const { data, loading } = useTechnologiesQuery({
    variables: {
      requiredTechnologiesIds: queryValues.technologiesIds,
    },
  });

  const technologiesData = useMemo(
    () => data?.technologies ?? [],
    [data],
  );

  return {
    technologiesData,
    loading,
  };
};
