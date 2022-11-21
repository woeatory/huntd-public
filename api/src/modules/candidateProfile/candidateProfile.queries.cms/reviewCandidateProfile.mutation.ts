import gql from 'graphql-tag';

export const REVIEW_CANDIDATE_PROFILE = gql`
  mutation reviewCandidateProfile(
    $id: Int!,
    $status: CandidateProfileStatus!,
    $rejectReason: String
  ) {
    reviewCandidateProfile(
      id: $id,
      status: $status,
      rejectReason: $rejectReason
    ) {
      id
      status
    }
  }
`;
