import gql from 'graphql-tag';

export const CANDIDATE_PROFILE_BASE_FRAGMENT = gql`
  fragment CandidateProfileBase on CandidateProfile {
    id
    status
    rejectReason
    position
    salary
    candidateDescription
    experienceDescription
    workExpectations
    achievements
    slug
    lastActionTime
  }
`;
