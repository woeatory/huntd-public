import {
  AuthUserDocument,
  LatestRecruiterProfileDocument,
  useSendRecruiterProfileToReviewMutation,
} from '@/controllers/graphql/generated';

export const useSendRecruiterProfileToReview = () => (
  useSendRecruiterProfileToReviewMutation({
    refetchQueries: [
      { query: LatestRecruiterProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  })
);
