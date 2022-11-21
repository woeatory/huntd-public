import gql from 'graphql-tag';

export const LOG_OUT_FROM_USER_MUTATION = gql`
  mutation logOutFromUser {
    logOutFromUser {
      ...UserBase
    }
  }
`;
