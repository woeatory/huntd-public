import { QueryResult } from '@apollo/client';
import {
  RecruiterProfile,
  RecruiterProfileBySlugQuery,
  useRecruiterProfileBySlugQuery,
} from '@/controllers/graphql/generated';

interface UseRecruiterProfileBySlug {
  (slug: string): [
    RecruiterProfile | null,
    QueryResult<RecruiterProfileBySlugQuery>
  ]
}
export const useRecruiterProfileBySlug: UseRecruiterProfileBySlug = (slug) => {
  const queryResult = useRecruiterProfileBySlugQuery({
    variables: { slug },
  });

  return [
    queryResult.data?.recruiterProfileBySlug ?? null,
    queryResult,
  ];
};
