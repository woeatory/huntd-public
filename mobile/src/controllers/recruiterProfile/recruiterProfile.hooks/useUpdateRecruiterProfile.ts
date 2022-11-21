import {
  AuthUserDocument,
  LatestRecruiterProfileDocument,
  useUpdateRecruiterProfileMutation,
} from '@/controllers/graphql/generated';

export const useUpdateRecruiterProfile = () => (
  useUpdateRecruiterProfileMutation({
    refetchQueries: [
      { query: LatestRecruiterProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  })
);
