import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useSendCandidateProfileToReviewMutation,
} from '@/controllers/graphql/generated';

export const useSendCandidateProfileToReview = () => (
  useSendCandidateProfileToReviewMutation({
    refetchQueries: [
      { query: LatestCandidateProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  })
);
