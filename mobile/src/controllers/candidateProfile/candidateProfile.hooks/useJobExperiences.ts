import { useMemo } from 'react';
import { JobExperience, useJobExperiencesQuery } from '@/controllers/graphql/generated';

interface UseJobExperience {
  (): JobExperience[];
}

export const useJobExperiences: UseJobExperience = () => {
  const jobExperiencesQueryResult = useJobExperiencesQuery();

  return useMemo(
    () => jobExperiencesQueryResult.data?.jobExperiences ?? [],
    [jobExperiencesQueryResult],
  );
};
