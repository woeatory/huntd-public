import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useUpdateCandidateProfileMutation,
} from '@/controllers/graphql/generated';

export const useUpdateCandidateProfile = () => (
  useUpdateCandidateProfileMutation({
    refetchQueries: [
      { query: LatestCandidateProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  })
);
