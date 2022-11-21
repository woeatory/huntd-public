import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useUpdateCandidateProfileMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useUpdateCandidateProfile = () => useUpdateCandidateProfileMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
