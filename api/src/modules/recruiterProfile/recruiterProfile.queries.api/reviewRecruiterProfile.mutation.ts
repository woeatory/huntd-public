import gql from 'graphql-tag';

export const REVIEW_RECRUITER_PROFILE = gql`
  mutation reviewRecruiterProfile(
    $id: Int!,
    $status: RecruiterProfileStatus!,
    $rejectReason: String
  ) {
    reviewRecruiterProfile(
      id: $id,
      status: $status,
      rejectReason: $rejectReason
    ) {
      id
      status
    }
  }
`;
