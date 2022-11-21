import {
  AuthUserDocument,
  LatestRecruiterProfileDocument,
  useUpdateRecruiterProfileMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useUpdateRecruiterProfile = () => useUpdateRecruiterProfileMutation({
  refetchQueries: [
    { query: LatestRecruiterProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
