import { useMemo } from 'react';
import { Specialization, useSpecializationQuery } from '@/controllers/graphql/generated';

interface UseSpecializations {
  (): Specialization[];
}

export const useSpecializations: UseSpecializations = () => {
  const specializationQueryResult = useSpecializationQuery();

  return useMemo(
    () => specializationQueryResult.data?.specializations ?? [],
    [specializationQueryResult],
  );
};
