import {
  AuthUserDocument,
  LatestCandidateProfileDocument,
  useSendCandidateProfileToReviewMutation,
} from '@/controllers/graphql/generated';

// eslint-disable-next-line max-len
export const useSendCandidateProfileToReview = () => useSendCandidateProfileToReviewMutation({
  refetchQueries: [
    { query: LatestCandidateProfileDocument },
    { query: AuthUserDocument },
  ],
  awaitRefetchQueries: true,
});
