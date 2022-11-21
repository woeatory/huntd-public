import { QueryResult } from '@apollo/client';
import {
  CandidateProfile,
  CandidateProfileBySlugQuery,
  useCandidateProfileBySlugQuery,
} from '@/controllers/graphql/generated';

interface UseCandidateProfileBySlug {
  (slug: string): [
    CandidateProfile | null,
    QueryResult<CandidateProfileBySlugQuery>
  ]
}
export const useCandidateProfileBySlug: UseCandidateProfileBySlug = (slug) => {
  const queryResult = useCandidateProfileBySlugQuery({
    variables: { slug },
  });

  return [
    queryResult.data?.candidateProfileBySlug ?? null,
    queryResult,
  ];
};
