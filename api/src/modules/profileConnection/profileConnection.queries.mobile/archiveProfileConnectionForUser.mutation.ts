import gql from 'graphql-tag';

export const ARCHIVE_PROFILE_CONNECTION_FOR_USER_MUTATION = gql`
  mutation archiveProfileConnectionForUser($id: Int!) {
    archiveProfileConnectionForUser(id: $id)
  }
`;
