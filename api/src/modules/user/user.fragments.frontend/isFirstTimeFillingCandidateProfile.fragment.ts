import gql from 'graphql-tag';

export const IS_FIRST_CANDIDATE_PROFILE_FRAGMENT = gql`
  fragment IsFirstCandidateProfile on User {
    isFirstTimeFillingCandidateProfile
  }
`;
