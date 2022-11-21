import gql from 'graphql-tag';

export const IS_FIRST_TIME_FILLING_RECRUITER_PROFILE_QUERY = gql`
  query isFirstTimeFillingRecruiterProfile {
    authUser {
      id
      isFirstTimeFillingRecruiterProfile: isFirstTimeFillingRecruiterProfile
    }
  }
`;
