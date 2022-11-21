import {
  AuthUserDocument,
  LatestRecruiterProfileDocument,
  useDeactivateRecruiterProfilesMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useDeactivateRecruiterProfile = () => useDeactivateRecruiterProfilesMutation({
  refetchQueries: [
    { query: LatestRecruiterProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
