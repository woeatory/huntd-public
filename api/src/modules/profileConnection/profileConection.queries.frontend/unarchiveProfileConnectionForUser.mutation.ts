import gql from 'graphql-tag';

export const UNARCHIVE_PROFILE_CONNECTION_FOR_USER_MUTATION = gql`
  mutation unarchiveProfileConnectionForUser($id: Int!) {
    unarchiveProfileConnectionForUser(id: $id)
  }
`;
