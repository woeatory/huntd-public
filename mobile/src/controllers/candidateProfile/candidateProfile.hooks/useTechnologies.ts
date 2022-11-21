import { useMemo } from 'react';
import { Technology, useTechnologiesQuery } from '@/controllers/graphql/generated';

interface UseTechnologies {
  (ids?: number[]): Technology[];
}

export const useTechnologies: UseTechnologies = (ids) => {
  const technologiesQueryResult = useTechnologiesQuery({
    variables: {
      requiredTechnologiesIds: ids,
    },
  });

  return useMemo(
    () => technologiesQueryResult.data?.technologies ?? [],
    [technologiesQueryResult],
  );
};
