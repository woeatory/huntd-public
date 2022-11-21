import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useCreateWorkPlaceMutation,
} from '@/controllers/graphql/generated';

export const useCreateWorkPlace = () => useCreateWorkPlaceMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
