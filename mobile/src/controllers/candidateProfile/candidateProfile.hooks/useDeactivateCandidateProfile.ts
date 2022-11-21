import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useDeactivateCandidateProfilesMutation,
} from '@/controllers/graphql/generated';

export const useDeactivateCandidateProfile = () => (
  useDeactivateCandidateProfilesMutation({
    refetchQueries: [
      { query: LatestCandidateProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  })
);
