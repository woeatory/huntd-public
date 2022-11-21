import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useUpdateWorkPlaceMutation,
} from '@/controllers/graphql/generated';

export const useUpdateWorkPlace = () => useUpdateWorkPlaceMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
