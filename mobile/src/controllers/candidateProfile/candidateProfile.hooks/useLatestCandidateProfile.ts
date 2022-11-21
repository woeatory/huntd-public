import { QueryResult } from '@apollo/client';
import {
  CandidateProfile,
  LatestCandidateProfileQuery,
  useLatestCandidateProfileQuery,
} from '@/controllers/graphql/generated';

interface UseLatestCandidateProfile {
  (): [
      CandidateProfile | null,
    QueryResult<LatestCandidateProfileQuery>
  ]
}
export const useLatestCandidateProfile: UseLatestCandidateProfile = () => {
  const queryResult = useLatestCandidateProfileQuery();

  return [
    queryResult.data?.latestCandidateProfile ?? null,
    queryResult,
  ];
};
