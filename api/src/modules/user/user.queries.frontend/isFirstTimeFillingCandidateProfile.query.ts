import gql from 'graphql-tag';

export const IS_FIRST_TIME_FILLING_CANDIDATE_PROFILE_QUERY = gql`
  query isFirstTimeFillingCandidateProfile {
    authUser {
      id
      isFirstTimeFillingCandidateProfile: isFirstTimeFillingCandidateProfile
    }
  }
`;
