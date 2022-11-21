import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useDeactivateCandidateProfilesMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useDeactivateCandidateProfile = () => useDeactivateCandidateProfilesMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
