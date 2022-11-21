import {
  AuthUserDocument,
  LatestRecruiterProfileDocument,
  useSendRecruiterProfileToReviewMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useSendRecruiterProfileToReview = () => useSendRecruiterProfileToReviewMutation({
  refetchQueries: [
    { query: LatestRecruiterProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
