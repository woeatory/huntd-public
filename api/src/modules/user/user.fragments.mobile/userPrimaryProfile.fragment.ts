import gql from 'graphql-tag';

export const USER_PRIMARY_PROFILE_FRAGMENT = gql`
  fragment UserPrimaryProfile on User {
    primaryProfile
  }
`;
