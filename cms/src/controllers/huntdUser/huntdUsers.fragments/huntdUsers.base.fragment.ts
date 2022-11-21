import { gql } from '@apollo/client';

export const HUNTD_USERS_BASE_FRAGMENT = gql`
  fragment HuntdUsersBase on HuntdUsers {
    id
    email
    first_name
    last_name
  }
`;
