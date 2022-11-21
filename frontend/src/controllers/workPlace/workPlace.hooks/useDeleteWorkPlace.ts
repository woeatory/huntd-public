import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useDeleteWorkPlaceMutation,
} from '@/controllers/graphql/generated';

export const useDeleteWorkPlace = () => useDeleteWorkPlaceMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
