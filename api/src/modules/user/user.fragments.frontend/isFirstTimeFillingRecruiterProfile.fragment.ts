import gql from 'graphql-tag';

export const IS_FIRST_RECRUITER_PROFILE_FRAGMENT = gql`
  fragment IsFirstRecruiterProfile on User {
    isFirstTimeFillingRecruiterProfile
  }
`;
