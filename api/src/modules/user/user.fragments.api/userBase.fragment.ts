import gql from 'graphql-tag';

export const USER_BASE_FRAGMENT = gql`
  fragment UserBase on User {
    id
    firstName
    lastName
    computedName
    username
    email
    phone
    inactive
    confirmed
    lastActionTime
    created
    ethWalletAddress
  }
`;
